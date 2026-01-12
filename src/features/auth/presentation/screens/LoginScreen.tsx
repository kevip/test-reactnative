import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { setCredentials } from '../../../../store/authSlice';
import { authUseCases } from '../../di';
import { RootStackParamList } from '../../../../../types/navigation';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Login'> };

export function LoginScreen({ navigation }: Props) {
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
      const user = await authUseCases.login.execute(username, password);
      dispatch(setCredentials({ token: user.token, username: user.username }));
      navigation.replace('Dashboard');
    } catch {
      Alert.alert('Login Failed', 'Invalid credentials. Try password: password123');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" editable={!loading} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry editable={!loading} />
      <View style={styles.buttonContainer}>
        <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
      </View>
      <Text style={styles.hint}>Hint: Use any username with password "password123"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
  buttonContainer: { width: '100%', marginTop: 10 },
  hint: { marginTop: 20, fontSize: 12, color: '#666', fontStyle: 'italic' },
});
