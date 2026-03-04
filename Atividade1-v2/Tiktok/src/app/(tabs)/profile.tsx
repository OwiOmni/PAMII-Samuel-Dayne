import { Image, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150?img=3" }}
        style={styles.avatar}
      />

      <Text style={styles.username}>@samueldev</Text>

      <View style={styles.stats}>
        <View>
          <Text style={styles.number}>120</Text>
          <Text style={styles.label}>Seguindo</Text>
        </View>

        <View>
          <Text style={styles.number}>10K</Text>
          <Text style={styles.label}>Seguidores</Text>
        </View>

        <View>
          <Text style={styles.number}>50K</Text>
          <Text style={styles.label}>Curtidas</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Desenvolvedor iniciante 🚀
        <br />
        Projeto escolar estilo TikTok
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 60,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  username: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
  },

  stats: {
    flexDirection: "row",
    gap: 30,
    marginVertical: 20,
  },

  number: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  label: {
    color: "gray",
    fontSize: 12,
    textAlign: "center",
  },

  bio: {
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});