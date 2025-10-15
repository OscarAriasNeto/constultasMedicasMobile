import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../styles/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

const getVariantStyles = (variant: ButtonVariant, disabled?: boolean) => {
  const baseColor = disabled ? theme.colors.border : theme.colors.primary;
  switch (variant) {
    case 'secondary':
      return {
        container: {
          backgroundColor: disabled ? theme.colors.border : theme.colors.secondary,
          borderColor: 'transparent',
        },
        text: {
          color: theme.colors.text,
        },
      };
    case 'ghost':
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
        text: {
          color: disabled ? theme.colors.textSecondary : theme.colors.primary,
        },
      };
    case 'outline':
      return {
        container: {
          backgroundColor: 'transparent',
          borderColor: disabled ? theme.colors.border : theme.colors.primary,
        },
        text: {
          color: disabled ? theme.colors.textSecondary : theme.colors.primary,
        },
      };
    case 'primary':
    default:
      return {
        container: {
          backgroundColor: baseColor,
          borderColor: 'transparent',
        },
        text: {
          color: theme.colors.surface,
        },
      };
  }
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
  icon,
  variant = 'primary',
  style,
  textStyle,
  testID,
}) => {
  const variantStyles = getVariantStyles(variant, disabled);
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: theme.radii.medium,
          borderWidth: variant === 'outline' ? 2 : 0,
          shadowColor: theme.colors.shadow,
          shadowOpacity: variant === 'ghost' || variant === 'outline' ? 0 : 0.3,
          shadowOffset: { width: 0, height: 6 },
          shadowRadius: 12,
          elevation: variant === 'ghost' || variant === 'outline' ? 0 : 4,
          opacity: isDisabled ? 0.7 : 1,
          backgroundColor: theme.colors.primary,
        },
        variantStyles.container,
        style,
      ]}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.text.color} />
      ) : (
        <>
          {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
          <Text
            style={[
              {
                fontSize: theme.typography.button.fontSize,
                fontWeight: theme.typography.button.fontWeight,
                letterSpacing: theme.typography.button.letterSpacing,
                color: variantStyles.text.color,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
