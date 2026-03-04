import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
    return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push("/newPost")} activeOpacity={0.8}>
            <Image
            source={require("../../../assets/img/hipo.jpg")}
            style={styles.background}
            />
        </TouchableOpacity>

        {/* Ícones laterais */}
        <View style={styles.sideIcons}>
            <TouchableOpacity>
            <Ionicons name="heart" size={35} color="#fff" />
            <Text style={styles.iconText}>120</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/comments")}>
            <Ionicons name="chatbubble" size={35} color="#fff" />
            <Text style={styles.iconText}>45</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/profile")}>
            <Ionicons name="person-circle" size={35} color="#fff" />
            </TouchableOpacity>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },

    background: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
    },

    sideIcons: {
        position: "absolute",
        right: 15,
        bottom: 100,
        alignItems: "center",
        gap: 20,
    },

    iconText: {
        color: "#fff",
        textAlign: "center",
    },
    });