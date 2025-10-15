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

const RegisterScreen: React.FC = () => {
  const { register } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Register'>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'info' as 'info' | 'success' | 'error',
  });

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [toast.visible]);

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      if (!name || !email || !password) {
        setError('Por favor, preencha todos os campos');
        setToast({ visible: true, message: 'Complete todas as informações', type: 'error' });
        return;
      }

      await register({
        name,
        email,
        password,
      });

      setToast({ visible: true, message: 'Conta criada com sucesso!', type: 'success' });
      navigation.navigate('Login');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      setToast({ visible: true, message: 'Não foi possível concluir o cadastro', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = useMemo(
    () => name.trim() !== '' && email.trim() !== '' && password.trim() !== '',
    [name, email, password],
  );

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
            <FormCard>
              <Title>Cadastro de Paciente</Title>

              <TextInput
                label="Nome completo"
                placeholder="Informe seu nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />

              <TextInput
                label="Email"
                placeholder="Informe um email válido"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />

              <TextInput
                label="Senha"
                placeholder="Crie uma senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                helperText="Use pelo menos 6 caracteres"
                errorMessage={error}
              />

              <Button
                title="Cadastrar"
                onPress={handleRegister}
                loading={loading}
                disabled={!canSubmit}
              />

              <Button
                title="Voltar para Login"
                variant="ghost"
                onPress={() => navigation.navigate('Login')}
                style={{ marginTop: theme.spacing.medium }}
                textStyle={{ color: theme.colors.primary }}
              />
            </FormCard>
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
  padding: ${theme.spacing.large}px;
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

const FormCard = styled.View`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.large}px;
  border-radius: ${theme.radii.large}px;
  shadow-color: ${theme.colors.shadow};
  shadow-opacity: 0.12;
  shadow-radius: 18px;
  shadow-offset: 0px 14px;
  elevation: 4;
`;

const Title = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: ${theme.typography.title.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.large}px;
  text-align: center;
`;

const LoaderWrapper = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${theme.spacing.large}px;
  align-items: center;
`;

export default RegisterScreen;
