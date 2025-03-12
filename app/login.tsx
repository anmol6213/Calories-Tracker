import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Alert,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { login, getCurrentUser } from '@/services/AuthService';
import { AppColors } from '@/constants/Colors';
import { FontFamily, FontSize } from '@/constants/Typography';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          // User is already logged in, redirect to home
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    // Add a small timeout to ensure AsyncStorage is ready
    const timer = setTimeout(() => {
      checkAuth();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      
      // For demo purposes, let's create a test user if none exists
      if (email === 'test@example.com' && password === 'password') {
        // Create a test user for easy login
        try {
          await login('test@example.com', 'password');
          router.replace('/(tabs)');
          return;
        } catch (error) {
          // If login fails, the user might not exist yet
          // We'll continue with the normal login flow
          console.log('Test user login failed, continuing with normal login');
        }
      }
      
      // Normal login process
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Login Failed', 
        error instanceof Error ? error.message : 'Invalid email or password. Try using test@example.com with password "password".'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  if (isCheckingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AppColors.primary.main} />
        <ThemedText variant="subtitle2" style={styles.loadingText}>Checking login status...</ThemedText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[AppColors.primary.light, AppColors.primary.dark]}
        style={styles.header}
      >
        <View style={styles.logoContainer}>
          <Ionicons name="nutrition-outline" size={60} color="white" />
        </View>
        <ThemedText variant="h3" style={styles.title}>Calories Tracker</ThemedText>
        <ThemedText variant="subtitle1" style={styles.subtitle}>Developed by Anmol Patil</ThemedText>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={22} color={AppColors.grey[600]} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={AppColors.grey[500]}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color={AppColors.grey[600]} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor={AppColors.grey[500]}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={22} 
              color={AppColors.grey[600]} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <LinearGradient
            colors={[AppColors.primary.main, AppColors.primary.dark]}
            style={styles.loginButtonGradient}
          >
            {isLoading ? (
              <View style={styles.loadingButtonContent}>
                <ActivityIndicator size="small" color="white" />
                <ThemedText variant="button" style={styles.loadingButtonText}>Signing in...</ThemedText>
              </View>
            ) : (
              <ThemedText variant="button" style={styles.loginButtonText}>Sign In</ThemedText>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.demoContainer}>
          <ThemedText variant="caption" style={styles.demoText}>
            Demo credentials: test@example.com / password
          </ThemedText>
        </View>

        <View style={styles.signupContainer}>
          <ThemedText variant="body2" style={styles.signupText}>Don't have an account?</ThemedText>
          <TouchableOpacity onPress={goToSignup}>
            <ThemedText variant="subtitle2" style={styles.signupLink}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: -30,
    backgroundColor: AppColors.background.paper,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.grey[100],
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: AppColors.grey[200],
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: FontSize.base,
    fontFamily: FontFamily.primary.regular,
    color: AppColors.text.primary,
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  loginButtonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white',
  },
  loadingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  demoContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  demoText: {
    color: AppColors.text.secondary,
    fontStyle: 'italic',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: AppColors.text.secondary,
  },
  signupLink: {
    color: AppColors.primary.main,
    marginLeft: 5,
  },
}); 