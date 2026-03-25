import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Alarme() {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Alarme</Text>

        <View style={styles.actions}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.menu}>⋮</Text>
        </View>
      </View>

      {/* CONTEÚDO CENTRAL */}
      <View style={styles.content}>
        <Text style={styles.empty}>Nenhum alarme</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  /* HEADER */
  header: {
    marginTop: 80, // espaço do topo (status bar)
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#f8a1a8", // cor mais suave igual ao print
    fontSize: 32,
    fontWeight: "300",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15, // espaçamento entre + e ⋮
  },

  plus: {
    color: "#f8a1a8",
    fontSize: 28,
  },

  menu: {
    color: "#f8a1a8",
    fontSize: 28,
  },

  /* CONTEÚDO */
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    color: "#f8a1a8",
    fontSize: 18,
  },
});