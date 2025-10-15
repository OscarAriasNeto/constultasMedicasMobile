import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Button from './Button';
import TextInput from './TextInput';
import theme from '../styles/theme';
import { Doctor } from '../types/doctors';
import { dinoDoctor } from '../utils/assetHelper';

type AppointmentFormProps = {
  onSubmit: (appointment: {
    doctorId: string;
    date: Date;
    time: string;
    description: string;
  }) => void;
};

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Cardiologista',
    image: dinoDoctor,
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    specialty: 'Dermatologista',
    image: dinoDoctor,
  },
  {
    id: '3',
    name: 'Dr. Pedro Oliveira',
    specialty: 'Oftalmologista',
    image: dinoDoctor,
  },
];

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [dateInput, setDateInput] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [description, setDescription] = useState('');
  const timeSlots = generateTimeSlots();

  const validateDate = (inputDate: string) => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = inputDate.match(dateRegex);

    if (!match) return false;

    const [, day, month, year] = match;
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));

    const today = new Date();
    const maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3));

    return date >= today && date <= maxDate;
  };

  const handleDateChange = (text: string) => {
    const numbers = text.replace(/\D/g, '');

    let formattedDate = '';
    if (numbers.length > 0) {
      if (numbers.length <= 2) {
        formattedDate = numbers;
      } else if (numbers.length <= 4) {
        formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
      } else {
        formattedDate = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
      }
    }

    setDateInput(formattedDate);
  };

  const handleSubmit = () => {
    if (!selectedDoctor || !selectedTime || !description) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (!validateDate(dateInput)) {
      alert('Por favor, insira uma data válida (DD/MM/AAAA)');
      return;
    }

    const [day, month, year] = dateInput.split('/');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));

    onSubmit({
      doctorId: selectedDoctor,
      date,
      time: selectedTime,
      description,
    });
  };

  const isTimeSlotAvailable = () => true;

  return (
    <Container>
      <Title>Selecione o Médico</Title>
      <DoctorList>
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            selected={selectedDoctor === doctor.id}
            onPress={() => setSelectedDoctor(doctor.id)}
          >
            <DoctorImage source={{ uri: doctor.image }} />
            <DoctorInfo>
              <DoctorName>{doctor.name}</DoctorName>
              <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
            </DoctorInfo>
          </DoctorCard>
        ))}
      </DoctorList>

      <Title>Data e Hora</Title>
      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        value={dateInput}
        onChangeText={handleDateChange}
        keyboardType="numeric"
        maxLength={10}
        errorMessage={dateInput && !validateDate(dateInput) ? 'Data inválida' : undefined}
      />

      <TimeSlotsContainer>
        <TimeSlotsHeader>Horários Disponíveis</TimeSlotsHeader>
        <TimeSlotsGrid>
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            const isAvailable = isTimeSlotAvailable();
            return (
              <TimeSlotButton
                key={time}
                selected={isSelected}
                disabled={!isAvailable}
                onPress={() => isAvailable && setSelectedTime(time)}
              >
                <TimeSlotText selected={isSelected} disabled={!isAvailable}>
                  {time}
                </TimeSlotText>
              </TimeSlotButton>
            );
          })}
        </TimeSlotsGrid>
      </TimeSlotsContainer>

      <TextInput
        placeholder="Descrição da consulta"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        helperText="Informe detalhes importantes para a consulta"
      />

      <Button
        title="Agendar Consulta"
        onPress={handleSubmit}
        style={{ marginTop: theme.spacing.large }}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: ${theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const DoctorList = styled.ScrollView`
  margin-bottom: ${theme.spacing.large}px;
`;

type DoctorCardProps = { selected: boolean };

const DoctorCard = styled(TouchableOpacity)<DoctorCardProps>`
  flex-direction: row;
  align-items: center;
  padding: ${theme.spacing.medium}px;
  background-color: ${({ selected }: DoctorCardProps) =>
    selected ? theme.colors.secondary : theme.colors.surface};
  border-radius: ${theme.radii.large}px;
  margin-bottom: ${theme.spacing.medium}px;
  border-width: 2px;
  border-color: ${({ selected }: DoctorCardProps) =>
    selected ? theme.colors.primary : theme.colors.border};
  shadow-color: ${theme.colors.shadow};
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  shadow-offset: 0px 8px;
  elevation: 3;
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

const DoctorInfo = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xsmall}px;
`;

const TimeSlotsContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

const TimeSlotsHeader = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  font-weight: 600;
  margin-bottom: ${theme.spacing.small}px;
`;

const TimeSlotsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.small}px;
`;

type TimeSlotButtonProps = { selected: boolean; disabled: boolean };

const TimeSlotButton = styled(TouchableOpacity)<TimeSlotButtonProps>`
  width: 22%;
  padding: ${theme.spacing.small}px;
  border-radius: ${theme.radii.small}px;
  border-width: 2px;
  border-color: ${({ selected }: TimeSlotButtonProps) =>
    selected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ selected }: TimeSlotButtonProps) =>
    selected ? theme.colors.secondary : theme.colors.surface};
  opacity: ${({ disabled }: TimeSlotButtonProps) => (disabled ? 0.4 : 1)};
  align-items: center;
`;

type TimeSlotTextProps = { selected: boolean; disabled: boolean };

const TimeSlotText = styled(Text)<TimeSlotTextProps>`
  font-size: ${theme.typography.caption.fontSize}px;
  font-weight: 600;
  color: ${({ disabled, selected }: TimeSlotTextProps) =>
    disabled
      ? theme.colors.textSecondary
      : selected
        ? theme.colors.primary
        : theme.colors.text};
`;

export default AppointmentForm;
