/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import Colors, { AppColors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Make sure Colors[theme][colorName] exists
    if (Colors[theme] && colorName in Colors[theme]) {
      return Colors[theme][colorName];
    }
    
    // Fallback to a safe default color
    return theme === 'light' ? AppColors.text.primary : '#FFFFFF';
  }
}
