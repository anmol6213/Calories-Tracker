import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '@/constants/Colors';
import { FontFamily } from '@/constants/Typography';

interface FoodItem {
  name: string;
  calories: number;
  quantity?: string;
  unit?: string;
}

interface FoodAnalysisResultsProps {
  foodItems: FoodItem[];
  totalCalories: number;
  nutritionalSummary?: string;
  error?: string;
}

const { width } = Dimensions.get('window');

export default function FoodAnalysisResults({
  foodItems,
  totalCalories,
  nutritionalSummary,
  error
}: FoodAnalysisResultsProps) {
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning-outline" size={40} color={AppColors.error.main} />
        <ThemedText variant="body2" style={styles.errorText}>{error}</ThemedText>
      </View>
    );
  }

  if (foodItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={[AppColors.primary.main, AppColors.primary.dark]}
          style={styles.calorieCircle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ThemedText variant="h4" style={styles.calorieNumber}>{Math.round(totalCalories)}</ThemedText>
          <ThemedText variant="body2" style={styles.calorieLabel}>calories</ThemedText>
        </LinearGradient>
      </View>

      <View style={styles.listContainer}>
        <ThemedText variant="subtitle1" style={styles.sectionTitle}>Food Items</ThemedText>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {foodItems.map((item, index) => (
            <View key={index} style={styles.foodItem}>
              <View style={styles.foodItemLeft}>
                <Ionicons 
                  name="restaurant-outline" 
                  size={20} 
                  color={AppColors.primary.main} 
                  style={styles.foodIcon}
                />
                <ThemedText variant="body1" style={styles.foodName}>
                  {item.name}
                  {item.quantity && item.unit && ` (${item.quantity} ${item.unit})`}
                  {item.quantity && !item.unit && ` (${item.quantity})`}
                </ThemedText>
              </View>
              <View style={styles.calorieTag}>
                <ThemedText variant="body2" style={styles.foodCalories}>
                  {Math.round(item.calories)} cal
                </ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {nutritionalSummary && (
        <View style={styles.summaryContainer}>
          <ThemedText variant="subtitle1" style={styles.sectionTitle}>Nutritional Summary</ThemedText>
          <View style={styles.summaryBox}>
            <Ionicons name="information-circle-outline" size={20} color={AppColors.primary.main} style={styles.summaryIcon} />
            <ThemedText variant="body2" style={styles.summaryText}>{nutritionalSummary}</ThemedText>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  calorieCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  calorieNumber: {
    color: 'white',
  },
  calorieLabel: {
    color: 'white',
    opacity: 0.9,
  },
  listContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 12,
    color: AppColors.text.primary,
  },
  scrollView: {
    maxHeight: 200,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.grey[200],
  },
  foodItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodIcon: {
    marginRight: 8,
  },
  foodName: {
    color: AppColors.text.primary,
    flex: 1,
  },
  calorieTag: {
    backgroundColor: AppColors.primary.light + '20', // 20% opacity
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  foodCalories: {
    fontWeight: 'bold',
    color: AppColors.primary.main,
  },
  summaryContainer: {
    marginTop: 8,
  },
  summaryBox: {
    backgroundColor: AppColors.grey[100],
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  summaryIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  summaryText: {
    lineHeight: 20,
    color: AppColors.text.secondary,
    flex: 1,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.error.light + '20', // 20% opacity
    borderRadius: 12,
  },
  errorText: {
    color: AppColors.error.main,
    textAlign: 'center',
    marginTop: 10,
  },
}); 