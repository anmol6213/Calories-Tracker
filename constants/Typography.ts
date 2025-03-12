import { Platform } from 'react-native';

// Define the font families
export const FontFamily = {
  // Primary font family
  primary: {
    regular: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'SF Pro Text-Medium' : 'Roboto-Medium',
    semiBold: Platform.OS === 'ios' ? 'SF Pro Text-Semibold' : 'Roboto-Medium',
    bold: Platform.OS === 'ios' ? 'SF Pro Text-Bold' : 'Roboto-Bold',
  },
  // Secondary font family
  secondary: {
    regular: Platform.OS === 'ios' ? 'SF Pro Display' : 'sans-serif',
    medium: Platform.OS === 'ios' ? 'SF Pro Display-Medium' : 'sans-serif-medium',
    semiBold: Platform.OS === 'ios' ? 'SF Pro Display-Semibold' : 'sans-serif-medium',
    bold: Platform.OS === 'ios' ? 'SF Pro Display-Bold' : 'sans-serif',
  },
  // Monospace font family
  monospace: Platform.OS === 'ios' ? 'SF Mono' : 'monospace',
};

// Define font sizes
export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

// Define line heights
export const LineHeight = {
  xs: 16,
  sm: 20,
  md: 22,
  base: 24,
  lg: 28,
  xl: 30,
  '2xl': 32,
  '3xl': 38,
  '4xl': 44,
  '5xl': 56,
  '6xl': 68,
};

// Define font weights
export const FontWeight = {
  thin: '100',
  extraLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

// Define letter spacing
export const LetterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
};

// Typography styles
export const Typography = {
  // Headings
  h1: {
    fontFamily: FontFamily.secondary.bold,
    fontSize: FontSize['5xl'],
    lineHeight: LineHeight['5xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
  },
  h2: {
    fontFamily: FontFamily.secondary.bold,
    fontSize: FontSize['4xl'],
    lineHeight: LineHeight['4xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
  },
  h3: {
    fontFamily: FontFamily.secondary.bold,
    fontSize: FontSize['3xl'],
    lineHeight: LineHeight['3xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.normal,
  },
  h4: {
    fontFamily: FontFamily.secondary.bold,
    fontSize: FontSize['2xl'],
    lineHeight: LineHeight['2xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.normal,
  },
  h5: {
    fontFamily: FontFamily.secondary.semiBold,
    fontSize: FontSize.xl,
    lineHeight: LineHeight.xl,
    fontWeight: FontWeight.semiBold,
    letterSpacing: LetterSpacing.normal,
  },
  h6: {
    fontFamily: FontFamily.secondary.semiBold,
    fontSize: FontSize.lg,
    lineHeight: LineHeight.lg,
    fontWeight: FontWeight.semiBold,
    letterSpacing: LetterSpacing.normal,
  },
  // Body text
  body1: {
    fontFamily: FontFamily.primary.regular,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    fontWeight: FontWeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  body2: {
    fontFamily: FontFamily.primary.regular,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    fontWeight: FontWeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  // Subtitle
  subtitle1: {
    fontFamily: FontFamily.primary.medium,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.normal,
  },
  subtitle2: {
    fontFamily: FontFamily.primary.medium,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.normal,
  },
  // Button text
  button: {
    fontFamily: FontFamily.primary.medium,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.wide,
    textTransform: 'uppercase',
  },
  // Caption text
  caption: {
    fontFamily: FontFamily.primary.regular,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    fontWeight: FontWeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  // Overline text
  overline: {
    fontFamily: FontFamily.primary.regular,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.xs,
    fontWeight: FontWeight.normal,
    letterSpacing: LetterSpacing.wider,
    textTransform: 'uppercase',
  },
}; 