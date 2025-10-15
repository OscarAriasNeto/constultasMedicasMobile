import { Doctor } from '../types/types';
import { dinoDoctor } from '../../../utils/assetHelper';

// Lista de médicos disponíveis
export const availableDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Cardiologia',
    image: dinoDoctor,
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    specialty: 'Pediatria',
    image: dinoDoctor,
  },
  {
    id: '3',
    name: 'Dr. Pedro Oliveira',
    specialty: 'Ortopedia',
    image: dinoDoctor,
  },
  {
    id: '4',
    name: 'Dra. Ana Costa',
    specialty: 'Dermatologia',
    image: dinoDoctor,
  },
  {
    id: '5',
    name: 'Dr. Carlos Mendes',
    specialty: 'Oftalmologia',
    image: dinoDoctor,
  },
];
