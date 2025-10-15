import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Toast from '../components/Toast';
import DinoLoader from '../components/DinoLoader';
import { useAuth } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { RootStackParamList } from '../types/navigation';
import { dinoLogo } from '../utils/assetHelper';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

type ToastState = {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
};

const LoginScreen: React.FC = () => {
  const { signIn } = useAuth();
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
  });

  useEffect(() => {
    if (toast.visible) {
      const timeout = setTimeout(
        () => setToast((current) => ({ ...current, visible: false })),
        2800,
      );
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [toast.visible]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn({ email, password });
      setToast({ visible: true, message: 'Bem-vindo(a) de volta!', type: 'success' });
    } catch (err) {
      setError('Email ou senha inválidos');
      setToast({ visible: true, message: 'Verifique suas credenciais', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = useMemo(() => email.trim() !== '' && password.trim() !== '', [email, password]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Content>
            <Logo source={{ uri: dinoLogo }} resizeMode="contain" />
            <Title>DinoCare</Title>
            <Subtitle>Cuide das suas consultas com carinho pré-histórico</Subtitle>

            <FormCard>
              <FormTitle>Entre na sua conta</FormTitle>

              <TextInput
                label="Email"
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                helperText="Use o email cadastrado pela clínica"
              />

              <TextInput
                label="Senha"
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                helperText="Dica: utilize 123456 para testes"
                errorMessage={error}
              />

              <Button title="Entrar" onPress={handleLogin} loading={loading} disabled={!canSubmit} />

              <SecondaryAction>
                <SecondaryText>É novo por aqui?</SecondaryText>
                <Button
                  title="Criar conta"
                  variant="ghost"
                  onPress={() => navigation.navigate('Register')}
                  textStyle={{ color: theme.colors.primary }}
                  style={{ paddingVertical: 10 }}
                />
              </SecondaryAction>
            </FormCard>

            <HelperCard>
              <HelperTitle>Credenciais de exemplo</HelperTitle>
              <HelperText>Admin: admin@example.com / 123456</HelperText>
              <HelperText>Médicos: joao@example.com, maria@example.com, pedro@example.com / 123456</HelperText>
            </HelperCard>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

      {loading ? (
        <LoaderWrapper>
          <DinoLoader />
        </LoaderWrapper>
      ) : null}

      <Toast visible={toast.visible} message={toast.message} type={toast.type} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${theme.spacing.large}px;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: 140px;
  height: 140px;
  margin-bottom: ${theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: ${theme.typography.title.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xsmall}px;
`;

const Subtitle = styled.Text`
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.spacing.large}px;
`;

const FormCard = styled.View`
  width: 100%;
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.large}px;
  border-radius: ${theme.radii.large}px;
  shadow-color: ${theme.colors.shadow};
  shadow-opacity: 0.1;
  shadow-radius: 16px;
  shadow-offset: 0px 12px;
  elevation: 4;
`;

const FormTitle = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
  text-align: center;
`;

const SecondaryAction = styled.View`
  margin-top: ${theme.spacing.medium}px;
  align-items: center;
`;

const SecondaryText = styled.Text`
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.small}px;
`;

const HelperCard = styled.View`
  width: 100%;
  margin-top: ${theme.spacing.large}px;
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.large}px;
  border-radius: ${theme.radii.large}px;
  border-width: 2px;
  border-color: ${theme.colors.border};
`;

const HelperTitle = styled.Text`
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
  text-align: center;
`;

const HelperText = styled.Text`
  color: ${theme.colors.textSecondary};
  text-align: center;
  margin-bottom: ${theme.spacing.xsmall}px;
`;

const LoaderWrapper = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${theme.spacing.large}px;
  align-items: center;
`;

export default LoginScreen;
