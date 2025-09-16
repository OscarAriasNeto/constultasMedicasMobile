import React from 'react';
import { Avatar, Name, Email, RoleBadge, RoleText, SpecialtyText } from '../styles';

type ProfileCardProps = {
  user: {
    image: string;
    name: string;
    email: string;
    role: string;
    specialty?: string;
  };
  getRoleText: (role: string) => string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user, getRoleText }) => {
  return (
    <ProfileCard>
      <Avatar source={{ uri: user.image || 'https://via.placeholder.com/150' }} />
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <RoleBadge role={user.role}>
        <RoleText>{getRoleText(user.role)}</RoleText>
      </RoleBadge>

      {user.role === 'doctor' && <SpecialtyText>Especialidade: {user.specialty}</SpecialtyText>}
    </ProfileCard>
  );
};

export default ProfileCard;
