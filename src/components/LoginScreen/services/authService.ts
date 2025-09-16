import axios from 'axios';

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Falha na autenticação');
  }
};
