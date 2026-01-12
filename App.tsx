import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './src/store/store';
import { HomeScreen } from './src/shared/screens/HomeScreen';
import { LoginScreen } from './src/features/auth/presentation/screens/LoginScreen';
import { DashboardScreen } from './src/features/products/presentation/screens/DashboardScreen';
import { authUseCases } from './src/features/auth/di';
import { setCredentials } from './src/store/authSlice';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    authUseCases.getStoredAuth.execute().then(user => {
      if (user) store.dispatch(setCredentials({ token: user.token, username: user.username }));
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
