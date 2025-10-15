import React, { useMemo } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, ViewStyle } from 'react-native';
import theme from '../styles/theme';

interface TimeSlotListProps {
  onSelectTime: (time: string) => void;
  selectedTime?: string;
  style?: ViewStyle;
}

interface StyledProps {
  isSelected: boolean;
  isCurrent: boolean;
}

const TimeSlotList: React.FC<TimeSlotListProps> = ({
  onSelectTime,
  selectedTime,
  style,
}) => {
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const currentTime = useMemo(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    const roundMinutes = minutes >= 30 ? '30' : '00';
    return `${now.getHours().toString().padStart(2, '0')}:${roundMinutes}`;
  }, []);

  return (
    <Container style={style}>
      <TimeGrid>
        {timeSlots.map((time) => {
          const isSelected = selectedTime === time;
          const isCurrent = currentTime === time;
          return (
            <TimeCard
              key={time}
              onPress={() => onSelectTime(time)}
              isSelected={isSelected}
              isCurrent={isCurrent}
            >
              <TimeText isSelected={isSelected} isCurrent={isCurrent}>
                {time}
              </TimeText>
              {isCurrent ? <Badge>Agora</Badge> : null}
            </TimeCard>
          );
        })}
      </TimeGrid>
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

const TimeGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${theme.spacing.small}px;
`;

const TimeCard = styled(TouchableOpacity)<StyledProps>`
  width: 22%;
  padding: ${theme.spacing.small}px;
  border-radius: ${theme.radii.medium}px;
  background-color: ${({ isSelected, isCurrent }: StyledProps) =>
    isSelected
      ? theme.colors.secondary
      : isCurrent
        ? theme.colors.accent + '33'
        : theme.colors.surface};
  border-width: 2px;
  border-color: ${({ isSelected, isCurrent }: StyledProps) =>
    isSelected
      ? theme.colors.primary
      : isCurrent
        ? theme.colors.accent
        : theme.colors.border};
  align-items: center;
  justify-content: center;
  shadow-color: ${theme.colors.shadow};
  shadow-opacity: ${({ isSelected }: StyledProps) => (isSelected ? 0.2 : 0.08)};
  shadow-radius: 10px;
  shadow-offset: 0px 6px;
  elevation: ${({ isSelected }: StyledProps) => (isSelected ? 3 : 0)};
`;

const TimeText = styled.Text<StyledProps>`
  font-size: ${theme.typography.caption.fontSize}px;
  font-weight: 700;
  color: ${({ isSelected, isCurrent }: StyledProps) =>
    isSelected
      ? theme.colors.primary
      : isCurrent
        ? theme.colors.text
        : theme.colors.textSecondary};
`;

const Badge = styled.Text`
  margin-top: ${theme.spacing.xsmall}px;
  font-size: 10px;
  font-weight: 600;
  color: ${theme.colors.text};
`;

export default TimeSlotList;
