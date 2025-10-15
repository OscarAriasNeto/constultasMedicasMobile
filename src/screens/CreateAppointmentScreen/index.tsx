import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import DoctorList from '../../components/DoctorList';
import TimeSlotList from '../../components/TimeSlotList';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {
  Container,
  Content,
  FormCard,
  Title,
  SectionTitle,
  ErrorText,
} from './styles';
import { useCreateAppointment } from './hooks/useCreateAppointment';
import { availableDoctors } from './models/doctors';
import theme from '../../styles/theme';

const CreateAppointmentScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    loading,
    error,
    handleCreateAppointment,
  } = useCreateAppointment();

  return (
    <Container>
      <Header />
      <Content>
        <FormCard>
          <Title>Agendar Consulta</Title>

          <TextInput
            label="Data"
            placeholder="DD/MM/AAAA"
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
            maxLength={10}
          />

          <SectionTitle>Selecione um Horário</SectionTitle>
          <TimeSlotList onSelectTime={setSelectedTime} selectedTime={selectedTime} />

          <SectionTitle>Selecione um Médico</SectionTitle>
          <DoctorList
            doctors={availableDoctors}
            onSelectDoctor={setSelectedDoctor}
            selectedDoctorId={selectedDoctor?.id}
          />

          {error ? <ErrorText>{error}</ErrorText> : null}

          <Button
            title="Agendar"
            onPress={handleCreateAppointment}
            loading={loading}
            style={{ marginTop: theme.spacing.large }}
          />

          <Button
            title="Cancelar"
            variant="ghost"
            onPress={() => navigation.goBack()}
            style={{ marginTop: theme.spacing.small }}
            textStyle={{ color: theme.colors.primary }}
          />
        </FormCard>
      </Content>
    </Container>
  );
};

export default CreateAppointmentScreen;
