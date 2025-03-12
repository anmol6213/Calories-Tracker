import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Typography } from '@/constants/Typography';
import { AppColors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: keyof typeof Typography;
  color?: string;
};

export function ThemedText(props: ThemedTextProps) {
  const { style, lightColor, darkColor, variant, color, ...otherProps } = props;
  
  // Default to 'body1' if variant is undefined or not in Typography
  const safeVariant = (variant && Typography[variant]) ? variant : 'body1';
  
  // Get the default text color from the theme
  const defaultColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  // Get typography style based on variant
  const typographyStyle = Typography[safeVariant];
  
  // Process the color prop
  let finalColor = defaultColor;
  
  if (color) {
    // First assume color is a direct color value
    finalColor = color;
    
    // Check if it's a key in AppColors
    if (typeof color === 'string') {
      try {
        // Handle nested color objects like 'primary.main'
        if (color.includes('.')) {
          const [colorKey, shade] = color.split('.');
          if (
            colorKey && 
            shade && 
            AppColors[colorKey as keyof typeof AppColors] && 
            typeof AppColors[colorKey as keyof typeof AppColors] === 'object'
          ) {
            const colorObj = AppColors[colorKey as keyof typeof AppColors] as Record<string, any>;
            if (colorObj && colorObj[shade]) {
              finalColor = colorObj[shade];
            }
          }
        } 
        // Handle direct keys like 'primary'
        else if (color in AppColors) {
          const colorValue = AppColors[color as keyof typeof AppColors];
          if (typeof colorValue === 'string') {
            finalColor = colorValue;
          } else if (colorValue && typeof colorValue === 'object' && 'main' in colorValue) {
            finalColor = colorValue.main;
          }
        }
      } catch (error) {
        console.warn('Error processing color in ThemedText:', error);
        // Fallback to the default color if there's an error
        finalColor = defaultColor;
      }
    }
  }

  return (
    <Text 
      style={[
        typographyStyle, 
        { color: finalColor }, 
        style
      ]} 
      {...otherProps} 
    />
  );
}
