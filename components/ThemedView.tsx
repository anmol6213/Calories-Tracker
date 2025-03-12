import React from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { AppColors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Get the background color from the theme with a safe fallback
  let backgroundColor;
  
  try {
    backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  } catch (error) {
    // Fallback to a safe default if there's an error
    console.warn('Error in ThemedView:', error);
    backgroundColor = AppColors.background.default;
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
