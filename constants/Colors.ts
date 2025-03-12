/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// App theme colors
export const AppColors = {
  // Primary colors
  primary: {
    light: '#66BB6A',
    main: '#43A047',
    dark: '#2E7D32',
    contrastText: '#FFFFFF',
  },
  // Secondary colors
  secondary: {
    light: '#4FC3F7',
    main: '#29B6F6',
    dark: '#0288D1',
    contrastText: '#FFFFFF',
  },
  // Accent colors
  accent: {
    light: '#FFD54F',
    main: '#FFC107',
    dark: '#FFA000',
    contrastText: '#212121',
  },
  // Success colors
  success: {
    light: '#81C784',
    main: '#4CAF50',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
  // Error colors
  error: {
    light: '#E57373',
    main: '#F44336',
    dark: '#D32F2F',
    contrastText: '#FFFFFF',
  },
  // Warning colors
  warning: {
    light: '#FFB74D',
    main: '#FF9800',
    dark: '#F57C00',
    contrastText: '#212121',
  },
  // Info colors
  info: {
    light: '#64B5F6',
    main: '#2196F3',
    dark: '#1976D2',
    contrastText: '#FFFFFF',
  },
  // Neutral colors
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Text colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E',
    hint: '#9E9E9E',
  },
  // Background colors
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF',
    card: '#FFFFFF',
  },
  // Divider color
  divider: '#E0E0E0',
};

// Color scheme for light/dark mode
const tintColorLight = AppColors.primary.main;
const tintColorDark = AppColors.primary.light;

export default {
  light: {
    text: AppColors.text.primary,
    background: AppColors.background.default,
    tint: tintColorLight,
    tabIconDefault: AppColors.grey[500],
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    tabIconDefault: AppColors.grey[600],
    tabIconSelected: tintColorDark,
  },
};
