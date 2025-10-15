import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, Text, ViewStyle } from 'react-native';
import theme from '../styles/theme';

type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  style?: StyleProp<ViewStyle>;
  duration?: number;
}

const typeMap: Record<ToastType, { background: string; color: string }> = {
  success: { background: theme.colors.success, color: theme.colors.surface },
  error: { background: theme.colors.error, color: theme.colors.surface },
  info: { background: theme.colors.accent, color: theme.colors.text },
};

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  style,
  duration = 300,
}) => {
  const translateY = useRef(new Animated.Value(80)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 80,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, duration, translateY, opacity]);

  const palette = typeMap[type];

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
          paddingHorizontal: theme.spacing.large,
          paddingVertical: theme.spacing.small,
          borderRadius: theme.radii.large,
          backgroundColor: palette.background,
          shadowColor: '#00000050',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 20,
          elevation: 6,
          transform: [{ translateY }],
          opacity,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: palette.color,
          fontSize: theme.typography.body.fontSize,
          fontWeight: '600',
        }}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

export default Toast;
