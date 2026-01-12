import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { logout, selectUsername } from '../store/authSlice';
import { storageService } from '../services/storage';
import { RootStackParamList } from '../../types/navigation';

type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=30')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .finally(() => setLoading(false));
  }, []);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.title.localeCompare(b.title));
  }, [products]);

  const handleLogout = async () => {
    dispatch(logout());
    await storageService.clearAuthData();
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={sortedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View 
              style={styles.itemCard}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}. ${item.description}`}
            >
              <Image 
                source={{ uri: item.thumbnail }} 
                style={styles.image}
                accessibilityIgnoresInvertColors={true}
                accessibilityLabel={`Image of ${item.title}`}
              />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  loader: {
    flex: 1,
  },
  listContainer: {
    padding: 15,
  },
  itemCard: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  itemContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
});
