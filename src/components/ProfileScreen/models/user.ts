export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: 'admin' | 'doctor' | 'patient';
  specialty?: string;
}
