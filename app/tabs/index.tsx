import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
// @ts-ignore
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomImagePicker from '@/components/ImagePicker';
import FoodAnalysisResults from '@/components/FoodAnalysisResults';
import { analyzeFoodImage } from '@/services/CaloriesService';
import { Ionicons } from '@expo/vector-icons';
import { AppColors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

// Define the types for the food analysis
interface FoodItem {
  name: string;
  calories: number;
  quantity?: string;
  unit?: string;
}

interface FoodAnalysisResult {
  foodItems: FoodItem[];
  totalCalories: number;
  nutritionalSummary?: string;
  error?: string;
}

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FoodAnalysisResult | null>(null);
  const [imageKey, setImageKey] = useState(0); // Key to force re-render of ImagePicker

  const handleImageSelected = async (imageUri: string, base64: string) => {
    try {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      
      // Call the API to analyze the food image
      const result = await analyzeFoodImage(base64);
      
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResult({
        foodItems: [],
        totalCalories: 0,
        error: error instanceof Error ? error.message : 'Failed to analyze image'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRefresh = () => {
    setAnalysisResult(null);
    setImageKey(prevKey => prevKey + 1); // Change key to force re-render
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[AppColors.primary.light, AppColors.primary.dark]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <ThemedText variant="h3" style={styles.headerTitle}>Calories Tracker</ThemedText>
          <View style={styles.headerRow}>
            <ThemedText variant="subtitle1" style={styles.headerSubtitle}>
              AI-Powered Food Analysis
            </ThemedText>
            <TouchableOpacity 
              style={styles.refreshButton} 
              onPress={handleRefresh}
              disabled={isAnalyzing}
            >
              <Ionicons name="refresh" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="camera-outline" size={24} color={AppColors.primary.main} />
            <ThemedText variant="h6" style={styles.cardTitle}>Capture Food</ThemedText>
          </View>
          <ThemedText variant="body2" style={styles.cardSubtitle}>
            Take a photo of your meal to analyze calories
          </ThemedText>
          <CustomImagePicker 
            key={imageKey}
            onImageSelected={handleImageSelected}
            isLoading={isAnalyzing}
          />
        </View>

        {analysisResult && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="nutrition-outline" size={24} color={AppColors.primary.main} />
              <ThemedText variant="h6" style={styles.cardTitle}>Analysis Results</ThemedText>
            </View>
            <FoodAnalysisResults
              foodItems={analysisResult.foodItems}
              totalCalories={analysisResult.totalCalories}
              nutritionalSummary={analysisResult.nutritionalSummary}
              error={analysisResult.error}
            />
            <TouchableOpacity 
              style={styles.newAnalysisButton} 
              onPress={handleRefresh}
            >
              <LinearGradient
                colors={[AppColors.primary.main, AppColors.primary.dark]}
                style={styles.newAnalysisGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="camera" size={20} color="white" />
                <ThemedText variant="button" style={styles.newAnalysisText}>Analyze New Food</ThemedText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color={AppColors.primary.main} />
            <ThemedText variant="h6" style={styles.cardTitle}>How It Works</ThemedText>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumberContainer}>
              <ThemedText variant="subtitle1" style={styles.stepNumber}>1</ThemedText>
            </View>
            <ThemedText variant="body2" style={styles.stepText}>
              Take a photo of your food or select from gallery
            </ThemedText>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumberContainer}>
              <ThemedText variant="subtitle1" style={styles.stepNumber}>2</ThemedText>
            </View>
            <ThemedText variant="body2" style={styles.stepText}>
              Our AI powered by Google Gemini Pro 2.0 analyzes the image
            </ThemedText>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumberContainer}>
              <ThemedText variant="subtitle1" style={styles.stepNumber}>3</ThemedText>
            </View>
            <ThemedText variant="body2" style={styles.stepText}>
              Get detailed calorie information for each food item
            </ThemedText>
          </View>
        </View>

        <ThemedText variant="caption" style={styles.disclaimer}>
          Note: Calorie estimates are approximate and may vary based on portion sizes and preparation methods.
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background.default,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  headerTitle: {
    color: 'white',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: AppColors.background.paper,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    marginLeft: 8,
    color: AppColors.text.primary,
  },
  cardSubtitle: {
    color: AppColors.text.secondary,
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: 'white',
  },
  stepText: {
    flex: 1,
    color: AppColors.text.secondary,
  },
  newAnalysisButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  newAnalysisGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  newAnalysisText: {
    color: 'white',
    marginLeft: 8,
  },
  disclaimer: {
    textAlign: 'center',
    color: AppColors.text.secondary,
    marginBottom: 20,
  },
});
