import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  ScrollView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { logout, getCurrentUser, User } from '@/services/AuthService';
import { AppColors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const userData = await getCurrentUser();
      if (!userData) {
        // If no user is logged in, redirect to login
        router.replace('/login');
        return;
      }
      setUser(userData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await logout();
              
              // Force a delay to ensure AsyncStorage is updated
              setTimeout(() => {
                // Clear any cached data
                setUser(null);
                
                // Navigate to login screen
                router.replace('/login');
              }, 300);
            } catch (error) {
              console.error('Error during logout:', error);
              setIsLoading(false);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary.main} />
        <ThemedText variant="subtitle2" style={styles.loadingText}>Loading profile...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[AppColors.primary.light, AppColors.primary.dark]}
        style={styles.header}
      >
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <ThemedText variant="h2" style={styles.avatarText}>
              {user?.name.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
        </View>
        <ThemedText variant="h4" style={styles.name}>{user?.name}</ThemedText>
        <ThemedText variant="subtitle1" style={styles.email}>{user?.email}</ThemedText>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={24} color={AppColors.primary.main} />
            <ThemedText variant="h6" style={styles.sectionTitle}>Account Settings</ThemedText>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={22} color={AppColors.grey[600]} />
            <ThemedText variant="body1" style={styles.menuItemText}>Edit Profile</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={AppColors.grey[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={22} color={AppColors.grey[600]} />
            <ThemedText variant="body1" style={styles.menuItemText}>Change Password</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={AppColors.grey[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color={AppColors.grey[600]} />
            <ThemedText variant="body1" style={styles.menuItemText}>Notifications</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={AppColors.grey[400]} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={24} color={AppColors.primary.main} />
            <ThemedText variant="h6" style={styles.sectionTitle}>About</ThemedText>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color={AppColors.grey[600]} />
            <ThemedText variant="body1" style={styles.menuItemText}>Help & Support</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={AppColors.grey[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={22} color={AppColors.grey[600]} />
            <ThemedText variant="body1" style={styles.menuItemText}>Privacy Policy</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={AppColors.grey[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-checkmark-outline" size={22} color={AppColors.grey[600]} />
            <ThemedText variant="body1" style={styles.menuItemText}>Terms of Service</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={AppColors.grey[400]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <LinearGradient
            colors={[AppColors.error.light, AppColors.error.dark]}
            style={styles.logoutButtonGradient}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <ThemedText variant="button" style={styles.logoutButtonText}>Logout</ThemedText>
          </LinearGradient>
        </TouchableOpacity>

        <ThemedText variant="caption" style={styles.versionText}>Version 1.0.0</ThemedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.default,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background.default,
  },
  loadingText: {
    marginTop: 10,
    color: AppColors.text.secondary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarText: {
    color: 'white',
  },
  name: {
    color: 'white',
    marginBottom: 5,
  },
  email: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    padding: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginLeft: 8,
    color: AppColors.text.primary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.grey[200],
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
    color: AppColors.text.primary,
  },
  logoutButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: AppColors.text.secondary,
    marginBottom: 20,
  },
}); 