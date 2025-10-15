import { ImageSourcePropType } from 'react-native';

import { dinoDoctorUri, dinoPatientUri, dinoLogoUri } from '../assets/dinoImages';

export const toImageSource = (uri: string): ImageSourcePropType => ({ uri });

export const dinoDoctor = dinoDoctorUri;
export const dinoPatient = dinoPatientUri;
export const dinoLogo = dinoLogoUri;
export const dinoLogoSource = toImageSource(dinoLogoUri);
