import { Patient } from '../../../types/appointments';
import { dinoPatient } from '../../../utils/assetHelper';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ana Souza',
    image: dinoPatient,
  },
  {
    id: '2',
    name: 'Carlos Pereira',
    image: dinoPatient,
  },
  {
    id: '3',
    name: 'Marina Lima',
    image: dinoPatient,
  },
];

export const getPatientInfo = (patientId: string): Patient | undefined => {
  return mockPatients.find((patient) => patient.id === patientId);
};
