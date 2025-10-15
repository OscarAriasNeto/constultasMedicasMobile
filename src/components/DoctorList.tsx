import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import theme from '../styles/theme';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface DoctorListProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  selectedDoctorId?: string;
  style?: ViewStyle;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onSelectDoctor,
  selectedDoctorId,
  style,
}) => {
  return (
    <Container style={style}>
      {doctors.map((doctor) => (
        <ListItem
          key={doctor.id}
          onPress={() => onSelectDoctor(doctor)}
          containerStyle={[
            styles.listItem,
            selectedDoctorId === doctor.id && styles.selectedItem,
          ]}
        >
          <Avatar
            size="medium"
            rounded
            source={{ uri: doctor.image }}
            containerStyle={styles.avatar}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.name}>{doctor.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.specialty}>
              {doctor.specialty}
            </ListItem.Subtitle>
          </ListItem.Content>
          <Chevron>
            <ChevronText>{selectedDoctorId === doctor.id ? '✓' : '→'}</ChevronText>
          </Chevron>
        </ListItem>
      ))}
    </Container>
  );
};

const styles = {
  listItem: {
    borderRadius: theme.radii.large,
    marginVertical: theme.spacing.xsmall,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  selectedItem: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.primary,
  },
  avatar: {
    backgroundColor: theme.colors.secondary,
  },
  name: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700' as const,
    color: theme.colors.text,
  },
  specialty: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
};

const Container = styled.View`
  margin-bottom: ${theme.spacing.medium}px;
`;

const Chevron = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.accent};
`;

const ChevronText = styled.Text`
  color: ${theme.colors.text};
  font-weight: 700;
`;

export default DoctorList;
