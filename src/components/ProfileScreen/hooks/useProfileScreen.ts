import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

export const useProfileScreen = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'doctor':
        return 'Médico';
      case 'patient':
        return 'Paciente';
      default:
        return role;
    }
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return { user, signOut, getRoleText, navigateBack };
};
