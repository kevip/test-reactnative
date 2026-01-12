import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../hooks/hooks';
import { setCredentials } from '../store/authSlice';
import { authService } from '../services/auth';
import { storageService } from '../services/storage';
import { RootStackParamList } from '../../types/navigation';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({ username, password });
      
      // Save to Redux store
      dispatch(setCredentials({ token: response.token, username: response.username }));
      
      // Persist to AsyncStorage
      await storageService.saveAuthData(response.token, response.username);
      
      // Navigate to Dashboard
      navigation.replace('Dashboard');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password. Try password: password123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        editable={!loading}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      
      <View style={styles.buttonContainer}>
        <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
      </View>
      
      <Text style={styles.hint}>Hint: Use any username with password "password123"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  hint: {
    marginTop: 20,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
