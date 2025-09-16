// src/screens/LoginScreen/index.tsx
import React from 'react';
import { Button, Text } from 'react-native-elements';
import { useLoginScreen } from './hooks/useLoginScreen';
import LoginForm from './components/LoginForm';
import { View } from 'react-native';
import theme from '../../styles/theme';

const LoginScreen: React.FC = () => {
  const { handleLogin, error, loading, navigateToRegister } = useLoginScreen();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <LoginForm 
        onLogin={handleLogin} 
        error={error} 
        loading={loading} 
      />
      <Button 
        title="Cadastrar Novo Usuário" 
        onPress={navigateToRegister} 
        containerStyle={{ marginTop: 10 }} 
        buttonStyle={{ backgroundColor: theme.colors.secondary, paddingVertical: 12 }} 
      />
      <Text style={{ marginTop: 20, textAlign: 'center', color: theme.colors.text }}>
        Primeiro acesso? Cadastre-se como Admin ou Paciente.
      </Text>
    </View>
  );
};

export default LoginScreen;
