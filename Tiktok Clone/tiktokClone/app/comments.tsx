import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const comments = [
  { id: '1', text: 'Muito bom 🔥' },
  { id: '2', text: 'Quero mais!' },
];

export default function CommentsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.comment}>{item.text}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backText: {
    color: 'white',
    fontSize: 16,
  },
  comment: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
});
