// Subtract Design Tokens - Premium Dark Finance Theme
export const colors = {
  // Backgrounds
  background: '#0D0D0F',
  surface: '#1A1A1F',
  surfaceElevated: '#222228',
  
  // Borders
  border: '#2C2C30',
  borderLight: '#3A3A42',
  
  // Text
  textPrimary: '#F5F5F7',
  textSecondary: '#8E8E93',
  textMuted: '#5C5C6D',
  
  // Brand Colors
  primary: '#00C896',       // Emerald green - savings/positive
  primaryLight: '#00E5AD',
  primaryDark: '#00A87E',
  
  // Accent Colors
  accent: '#F5A623',         // Warm amber - attention/warnings
  accentLight: '#FFB84D',
  
  // Semantic Colors
  danger: '#FF6B6B',         // Coral red - cancellation/waste
  dangerLight: '#FF8A8A',
  success: '#00C896',
  warning: '#F5A623',
  error: '#FF6B6B',
  
  // Category Colors
  streaming: '#4A9EFF',
  fitness: '#10B981',
  utilities: '#6B7280',
  software: '#A855F7',
  gaming: '#EC4899',
  news: '#F59E0B',
  music: '#8B5CF6',
  cloud: '#06B6D4',
};

export const categoryColors: Record<string, string> = {
  'Streaming': colors.streaming,
  'Fitness': colors.fitness,
  'Utilities': colors.utilities,
  'Software': colors.software,
  'Gaming': colors.gaming,
  'News & Magazines': colors.news,
  'Music': colors.music,
  'Cloud Storage': colors.cloud,
  'Other': colors.utilities,
};

export const typography = {
  heroNumber: { fontSize: 52, fontWeight: '700' as const, letterSpacing: -1.5 },
  screenHeadline: { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  sectionHeader: { fontSize: 20, fontWeight: '600' as const },
  cardTitle: { fontSize: 17, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  bodyMedium: { fontSize: 15, fontWeight: '500' as const },
  caption: { fontSize: 13, fontWeight: '500' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
  label: { fontSize: 11, fontWeight: '600' as const, letterSpacing: 0.5 },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  card: 12,
  button: 10,
  chip: 20,
  input: 10,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};
