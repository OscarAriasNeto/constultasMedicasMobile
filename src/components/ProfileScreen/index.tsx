import React from 'react';
import { Button, Text } from 'react-native-elements';
import { useProfileScreen } from './hooks/useProfileScreen';
import ProfileCard from './components/ProfileCard';
import { ScrollView, View } from 'react-native';
import theme from '../../styles/theme';

const ProfileScreen: React.FC = () => {
  const { user, signOut, getRoleText, navigateBack } = useProfileScreen();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          Meu Perfil
        </Text>

        <ProfileCard user={user} getRoleText={getRoleText} />

        <Button
          title="Voltar"
          onPress={navigateBack}
          containerStyle={{ marginBottom: 20 }}
          buttonStyle={{ backgroundColor: theme.colors.primary, paddingVertical: 12 }}
        />
        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={{ marginBottom: 20 }}
          buttonStyle={{ backgroundColor: theme.colors.error, paddingVertical: 12 }}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
