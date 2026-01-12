import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../../domain/entities/Product';

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  return (
    <View style={styles.card} accessible accessibilityRole="button" accessibilityLabel={`${product.title}. ${product.description}`}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} accessibilityIgnoresInvertColors accessibilityLabel={`Image of ${product.title}`} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', marginBottom: 10, borderRadius: 8, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  image: { width: '100%', height: 150 },
  content: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  description: { fontSize: 14, color: '#666' },
});
