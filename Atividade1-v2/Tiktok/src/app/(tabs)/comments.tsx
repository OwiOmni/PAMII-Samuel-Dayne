import { StyleSheet, Text, View } from "react-native";

export default function Comments() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comentários</Text>

      <Text style={styles.comment}>@ana: Muito bom!</Text>
      <Text style={styles.comment}>@joao: Amei esse vídeo 😍</Text>
      <Text style={styles.comment}>@lucas: Top demais!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
  },
  comment: {
    color: "#fff",
    marginBottom: 10,
  },
});