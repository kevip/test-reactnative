import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { logout, selectUsername } from '../../../../store/authSlice';
import { authUseCases } from '../../../auth/di';
import { productUseCases } from '../../di';
import { Product } from '../../domain/entities/Product';
import { ProductCard } from '../components/ProductCard';
import { RootStackParamList } from '../../../../../types/navigation';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'> };

export function DashboardScreen({ navigation }: Props) {
  const username = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productUseCases.getProducts.execute(30).then(setProducts).finally(() => setLoading(false));
  }, []);

  const sortedProducts = useMemo(() => [...products].sort((a, b) => a.title.localeCompare(b.title)), [products]);

  const handleLogout = async () => {
    await authUseCases.logout.execute();
    dispatch(logout());
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
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#fff', padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  userInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  username: { fontSize: 16, fontWeight: '600', color: '#333' },
  loader: { flex: 1 },
  listContainer: { padding: 15 },
});
