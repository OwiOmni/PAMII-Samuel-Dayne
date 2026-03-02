import { Video } from 'expo-av';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

const { height, width } = Dimensions.get('window');

const videos = [
  {
    id: '1',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    user: '@dev1',
    description: 'Aprendendo React Native 🚀',
  },
  {
    id: '2',
    uri: 'https://www.w3schools.com/html/movie.mp4',
    user: '@dev2',
    description: 'Scroll estilo TikTok 🔥',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Video
            source={{ uri: item.uri }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay
            isLooping
          />

          <View style={styles.overlayLeft}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Text style={styles.user}>{item.user}</Text>
            </TouchableOpacity>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.overlayRight}>
            <TouchableOpacity>
              <Text style={styles.icon}>❤️</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/comments')}>
              <Text style={styles.icon}>💬</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.icon}>🔗</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlayLeft: {
    position: 'absolute',
    bottom: 80,
    left: 15,
  },
  user: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    marginTop: 5,
  },
  overlayRight: {
    position: 'absolute',
    bottom: 120,
    right: 15,
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
    color: 'white',
    marginVertical: 10,
  },
});
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
