import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { AppColors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ThemedText variant="h1" style={styles.title}>Welcome to the Home Page</ThemedText>
      <Text style={styles.subtitle}>Developed by Anmol Patil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.h1,
    color: AppColors.primary.main,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.subtitle1,
    color: AppColors.text.secondary,
    marginTop: 10,
  },
}); 