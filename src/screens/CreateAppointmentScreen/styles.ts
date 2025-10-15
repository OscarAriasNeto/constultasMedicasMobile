import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: theme.spacing.large,
    paddingBottom: theme.spacing.xlarge,
  },
})``;

export const FormCard = styled.View`
  background-color: ${theme.colors.surface};
  padding: ${theme.spacing.large}px;
  border-radius: ${theme.radii.large}px;
  shadow-color: ${theme.colors.shadow};
  shadow-opacity: 0.12;
  shadow-radius: 18px;
  shadow-offset: 0px 14px;
  elevation: 4;
  margin-top: ${theme.spacing.large}px;
`;

export const Title = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: ${theme.typography.title.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
  text-align: center;
`;

export const SectionTitle = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
  margin-top: ${theme.spacing.large}px;
`;

export const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-top: ${theme.spacing.medium}px;
`;
