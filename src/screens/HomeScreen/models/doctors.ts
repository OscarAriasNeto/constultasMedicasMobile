// src/screens/HomeScreen/models/doctors.ts
import { Doctor } from '../../../types/doctors';
import { dinoDoctor } from '../../../utils/assetHelper';

export const mockDoctors: Doctor[] = [
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

export const getDoctorInfo = (doctorId: string): Doctor | undefined => {
  return mockDoctors.find((doctor) => doctor.id === doctorId);
};
