import React, { useState } from 'react';
import {
  StyleProp,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../styles/theme';

export interface DinoTextInputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const TextInput: React.FC<DinoTextInputProps> = ({
  label,
  helperText,
  errorMessage,
  successMessage,
  containerStyle,
  inputStyle,
  editable = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const showError = Boolean(errorMessage);
  const showSuccess = Boolean(successMessage) && !showError;

  return (
    <View style={[{ marginBottom: theme.spacing.medium }, containerStyle]}>
      {label ? (
        <Text
          style={{
            fontSize: theme.typography.caption.fontSize,
            fontWeight: '600',
            color: theme.colors.text,
            marginBottom: theme.spacing.xsmall,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={{
          backgroundColor: editable ? theme.colors.surface : theme.colors.background,
          borderRadius: theme.radii.medium,
          borderWidth: 2,
          borderColor: showError
            ? theme.colors.error
            : showSuccess
              ? theme.colors.success
              : isFocused
                ? theme.colors.accent
                : theme.colors.border,
          paddingHorizontal: theme.spacing.medium,
          paddingVertical: 4,
          shadowColor: theme.colors.shadow,
          shadowOpacity: isFocused ? 0.25 : 0,
          shadowOffset: { width: 0, height: 8 },
          shadowRadius: 16,
        }}
      >
        <RNTextInput
          {...props}
          editable={editable}
          onFocus={(event) => {
            setIsFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setIsFocused(false);
            props.onBlur?.(event);
          }}
          placeholderTextColor={theme.colors.textSecondary}
          style={[
            {
              fontSize: theme.typography.body.fontSize,
              color: theme.colors.text,
              paddingVertical: 10,
            },
            inputStyle,
          ]}
        />
      </View>
      {showError ? (
        <Text
          style={{
            marginTop: theme.spacing.xsmall,
            color: theme.colors.error,
            fontSize: theme.typography.caption.fontSize,
          }}
        >
          {errorMessage}
        </Text>
      ) : showSuccess ? (
        <Text
          style={{
            marginTop: theme.spacing.xsmall,
            color: theme.colors.success,
            fontSize: theme.typography.caption.fontSize,
          }}
        >
          {successMessage}
        </Text>
      ) : helperText ? (
        <Text
          style={{
            marginTop: theme.spacing.xsmall,
            color: theme.colors.textSecondary,
            fontSize: theme.typography.caption.fontSize,
          }}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

export default TextInput;
