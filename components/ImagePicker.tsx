import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Platform, ActivityIndicator, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from '@/constants/Colors';
import { FontFamily } from '@/constants/Typography';

type ImagePickerProps = {
  onImageSelected: (imageUri: string, base64: string) => void;
  isLoading?: boolean;
};

const { width } = Dimensions.get('window');

export default function CustomImagePicker({ onImageSelected, isLoading = false }: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        alert('Sorry, we need camera and media library permissions to make this work!');
        return false;
      }
      return true;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
      if (selectedAsset.base64) {
        onImageSelected(selectedAsset.uri, selectedAsset.base64);
      }
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setImage(selectedAsset.uri);
      if (selectedAsset.base64) {
        onImageSelected(selectedAsset.uri, selectedAsset.base64);
      }
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={AppColors.primary.main} />
              <ThemedText variant="subtitle1" style={styles.loadingText}>Analyzing food...</ThemedText>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Ionicons name="fast-food-outline" size={80} color={AppColors.grey[300]} />
          <ThemedText variant="body1" style={styles.placeholderText}>
            Take a photo of your food to calculate calories
          </ThemedText>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.buttonCamera} 
          onPress={takePhoto}
          disabled={isLoading}
        >
          <LinearGradient
            colors={[AppColors.primary.main, AppColors.primary.dark]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="camera" size={24} color="white" />
            <ThemedText variant="button" style={styles.buttonText}>Take Photo</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.buttonGallery} 
          onPress={pickImage}
          disabled={isLoading}
        >
          <LinearGradient
            colors={[AppColors.grey[500], AppColors.grey[700]]}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="images" size={24} color="white" />
            <ThemedText variant="button" style={styles.buttonText}>Gallery</ThemedText>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 12,
  },
  placeholderContainer: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: AppColors.grey[200],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 20,
    backgroundColor: AppColors.grey[50],
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 16,
    color: AppColors.grey[600],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonCamera: {
    flex: 0.48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonGallery: {
    flex: 0.48,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
}); 