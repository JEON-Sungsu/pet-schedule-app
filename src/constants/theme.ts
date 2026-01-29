export const colors = {
  // Primary
  primary: '#F2EDDC',

  // Secondary
  secondary: '#F0D7D3',

  // Neutral
  background: '#FFFFFF',
  surface: '#F7F7F7',
  border: '#E5E5E5',

  // Text
  text: '#262626',
  textSecondary: '#737373',
  textDisabled: '#A3A3A3',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
} as const;

export const fontFamily = {
  regular: 'Pretendard-Regular',
  medium: 'Pretendard-Medium',
  semibold: 'Pretendard-SemiBold',
  bold: 'Pretendard-Bold',
} as const;

export const lineHeight = 1.5;

export const textStyles = {
  // Heading (28, 22, 18) - Bold, Semibold
  heading28Bold: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 28 * lineHeight,
  },
  heading28Semibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 28,
    lineHeight: 28 * lineHeight,
  },
  heading22Bold: {
    fontFamily: fontFamily.bold,
    fontSize: 22,
    lineHeight: 22 * lineHeight,
  },
  heading22Semibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 22,
    lineHeight: 22 * lineHeight,
  },
  heading18Bold: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 18 * lineHeight,
  },
  heading18Semibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 18,
    lineHeight: 18 * lineHeight,
  },

  // Title (18) - Bold, Semibold
  title18Bold: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 18 * lineHeight,
  },
  title18Semibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 18,
    lineHeight: 18 * lineHeight,
  },

  // Body (16, 14) - Semibold, Medium, Regular
  body16Semibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 16,
    lineHeight: 16 * lineHeight,
  },
  body16Medium: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 16 * lineHeight,
  },
  body16Regular: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 16 * lineHeight,
  },
  body14Semibold: {
    fontFamily: fontFamily.semibold,
    fontSize: 14,
    lineHeight: 14 * lineHeight,
  },
  body14Medium: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    lineHeight: 14 * lineHeight,
  },
  body14Regular: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 14 * lineHeight,
  },
} as const;

export const theme = {
  colors,
  fontFamily,
  lineHeight,
  textStyles,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type TextStyles = typeof textStyles;
