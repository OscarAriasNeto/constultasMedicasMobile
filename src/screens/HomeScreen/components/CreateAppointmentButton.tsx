import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import { Container } from '../styles';
import theme from '../../../styles/theme';

type CreateAppointmentButtonProps = {
  onPress: () => void;
};

const CreateAppointmentButton: React.FC<CreateAppointmentButtonProps> = ({ onPress }) => (
  <Container>
    <Button
      title="Agendar Nova Consulta"
      icon={
        <FontAwesome
          name="calendar-plus-o"
          size={20}
          color={theme.colors.white}
          style={{ marginRight: 8 }}
        />
      }
      buttonStyle={{
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        padding: 12,
        marginBottom: theme.spacing.medium,
      }}
      onPress={onPress}
    />
  </Container>
);

export default CreateAppointmentButton;