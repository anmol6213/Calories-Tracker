import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AppColors } from '@/constants/Colors';
import { FontFamily } from '@/constants/Typography';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ 
        light: AppColors.primary.light, 
        dark: AppColors.primary.dark 
      }}
      headerImage={
        <IconSymbol
          size={310}
          color={AppColors.primary.main}
          name="fork.knife"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText variant="h3">About Calories Tracker</ThemedText>
      </ThemedView>
      <ThemedText variant="body1">
        This app uses AI to analyze food images and estimate calorie content.
      </ThemedText>
      
      <Collapsible title="How It Works">
        <ThemedText variant="body1">
          Take a photo of your food or select an image from your gallery. Our app uses Google's Gemini Pro 2.0 
          AI model to analyze the image and identify food items. The AI estimates calories for each item and 
          provides nutritional information.
        </ThemedText>
        <ThemedText variant="body1" style={styles.spacer}>
          The analysis happens in real-time, giving you immediate feedback on your meal's calorie content.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="AI Technology">
        <ThemedText variant="body1">
          This app uses Google's Gemini Pro 2.0 model, accessed through OpenRouter's API. Gemini Pro is a 
          multimodal AI model that can analyze both text and images, making it perfect for food recognition.
        </ThemedText>
        <ThemedText variant="body1" style={styles.spacer}>
          The model has been trained on millions of images and can recognize thousands of different food items 
          with high accuracy.
        </ThemedText>
        <ExternalLink href="https://openrouter.ai/">
          <ThemedText variant="body2" color={AppColors.primary.main}>Learn more about OpenRouter</ThemedText>
        </ExternalLink>
      </Collapsible>
      
      <Collapsible title="Privacy Information">
        <ThemedText variant="body1">
          When you take or upload a photo, it is sent to our AI service for analysis. The images are processed 
          to identify food items and estimate calories, but they are not permanently stored.
        </ThemedText>
        <ThemedText variant="body1" style={styles.spacer}>
          We do not collect or store personal information about your eating habits or food choices.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="Calorie Accuracy">
        <ThemedText variant="body1">
          Calorie estimates are based on standard portion sizes and typical preparation methods. Actual calorie 
          content may vary based on:
        </ThemedText>
        <ThemedText variant="body2" style={styles.listItem}>• Exact portion sizes</ThemedText>
        <ThemedText variant="body2" style={styles.listItem}>• Specific ingredients used</ThemedText>
        <ThemedText variant="body2" style={styles.listItem}>• Cooking methods and added fats</ThemedText>
        <ThemedText variant="body2" style={styles.listItem}>• Brand variations</ThemedText>
        <ThemedText variant="body1" style={styles.spacer}>
          For precise nutritional tracking, consider consulting with a nutritionist or using a food scale.
        </ThemedText>
      </Collapsible>
      
      <Collapsible title="Tips for Best Results">
        <ThemedText variant="body2" style={styles.listItem}>• Take clear, well-lit photos</ThemedText>
        <ThemedText variant="body2" style={styles.listItem}>• Capture all food items in a single image when possible</ThemedText>
        <ThemedText variant="body2" style={styles.listItem}>• Avoid extreme angles that distort food appearance</ThemedText>
        <ThemedText variant="body2" style={styles.listItem}>• For mixed dishes, try to make individual components visible</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 8,
  },
  headerImage: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    opacity: 0.5,
  },
  spacer: {
    marginTop: 10,
  },
  listItem: {
    marginLeft: 10,
    marginTop: 5,
  },
});
