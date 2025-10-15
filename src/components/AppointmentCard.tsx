import React from 'react';
import styled from 'styled-components/native';
import { Image, ViewStyle } from 'react-native';
import theme from '../styles/theme';
import { dinoDoctor } from '../utils/assetHelper';

interface AppointmentCardProps {
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  onPress?: () => void;
  style?: ViewStyle;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  date,
  time,
  specialty,
  status,
  onPress,
  style,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.accent;
    }
  };

  const statusLabel =
    status === 'confirmed' ? 'Confirmada' : status === 'cancelled' ? 'Cancelada' : 'Pendente';

  return (
    <CardContainer style={style} onPress={onPress}>
      <DoctorInfo>
        <DoctorAvatar source={{ uri: dinoDoctor }} />
        <TextContainer>
          <DoctorName>{doctorName}</DoctorName>
          <Specialty>{specialty}</Specialty>
        </TextContainer>
      </DoctorInfo>

      <AppointmentInfo>
        <InfoRow>
          <InfoLabel>Data</InfoLabel>
          <InfoValue>{date}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Horário</InfoLabel>
          <InfoValue>{time}</InfoValue>
        </InfoRow>
      </AppointmentInfo>

      <StatusContainer>
        <StatusDot color={getStatusColor()} />
        <StatusText style={{ color: getStatusColor() }}>{statusLabel}</StatusText>
      </StatusContainer>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity`
  border-radius: ${theme.radii.large}px;
  margin-vertical: ${theme.spacing.small}px;
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.surface};
  border-width: 1px;
  border-color: ${theme.colors.border};
  shadow-color: ${theme.colors.shadow};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 3;
`;

const DoctorAvatar = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${theme.colors.secondary};
`;

const DoctorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${theme.spacing.medium}px;
`;

const TextContainer = styled.View`
  margin-left: ${theme.spacing.medium}px;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

const Specialty = styled.Text`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xsmall}px;
`;

const AppointmentInfo = styled.View`
  margin-bottom: ${theme.spacing.medium}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.xsmall}px;
`;

const InfoLabel = styled.Text`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.textSecondary};
`;

const InfoValue = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  font-weight: 600;
`;

const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${theme.spacing.small}px;
`;

type StatusDotProps = { color: string };

const StatusDot = styled.View<StatusDotProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }: StatusDotProps) => color};
  margin-right: ${theme.spacing.small}px;
`;

const StatusText = styled.Text`
  font-size: ${theme.typography.caption.fontSize}px;
  font-weight: 700;
`;

export default AppointmentCard;
