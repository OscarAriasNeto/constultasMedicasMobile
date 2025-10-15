import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import theme from '../styles/theme';

const DinoLoader: React.FC = () => {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -10,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [bounce]);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={{
          width: 72,
          height: 96,
          borderRadius: 48,
          transform: [{ translateY: bounce }],
          backgroundColor: theme.colors.primary,
          borderBottomLeftRadius: theme.radii.large,
          borderBottomRightRadius: theme.radii.large,
          borderTopLeftRadius: theme.radii.large * 1.5,
          borderTopRightRadius: theme.radii.large * 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: theme.colors.shadow,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 12 },
          shadowRadius: 12,
          elevation: 6,
        }}
      >
        <View
          style={{
            width: 40,
            height: 16,
            borderRadius: 8,
            backgroundColor: theme.colors.accent,
          }}
        />
      </Animated.View>
      <View
        style={{
          width: 60,
          height: 12,
          borderRadius: 6,
          marginTop: 12,
          backgroundColor: theme.colors.shadow,
          opacity: 0.3,
        }}
      />
    </View>
  );
};

export default DinoLoader;
