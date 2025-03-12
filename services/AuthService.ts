import AsyncStorage from '@react-native-async-storage/async-storage';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
}

// Auth state interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// For demo purposes, we'll use AsyncStorage to simulate a backend
// In a real app, you would connect to a real authentication API

// Initialize with a test user
const initializeTestUser = async () => {
  try {
    // Check if users exist
    const usersJson = await AsyncStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // If no users, create a test user
    if (users.length === 0) {
      const testUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        createdAt: new Date().toISOString()
      };
      
      users.push(testUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log('Test user created');
    }
  } catch (error) {
    console.error('Error initializing test user:', error);
  }
};

// Call initialization
initializeTestUser();

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  try {
    // Simulate API call delay - reduced for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get stored users
    const usersJson = await AsyncStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Find user with matching email and password
    const user = users.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store current user in AsyncStorage
    const { password: _, ...userWithoutPassword } = user;
    await AsyncStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Signup function
export const signup = async (name: string, email: string, password: string): Promise<User> => {
  try {
    // Simulate API call delay - reduced for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get stored users
    const usersJson = await AsyncStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Check if user with this email already exists
    const existingUser = users.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase()
    );
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    // Add to users array and save
    users.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    
    // Store current user in AsyncStorage (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    await AsyncStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    // Clear the current user
    await AsyncStorage.removeItem('currentUser');
    
    // For extra safety, we can also clear any other user-specific data
    // that might be stored in AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    const userSpecificKeys = keys.filter(key => 
      key.startsWith('user_') || 
      key.startsWith('preferences_') || 
      key.startsWith('settings_')
    );
    
    if (userSpecificKeys.length > 0) {
      await AsyncStorage.multiRemove(userSpecificKeys);
    }
    
    // Add a small delay to ensure AsyncStorage operations complete
    await new Promise(resolve => setTimeout(resolve, 300));
    
    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Check if user is already logged in
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}; 