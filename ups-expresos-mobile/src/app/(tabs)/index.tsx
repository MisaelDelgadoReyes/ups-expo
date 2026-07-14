import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { colors } = useTheme();
  
  const styles = makeStyles(colors);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Hola, {user?.name || user?.email.split('@')[0] || 'estudiante'}</Text>
      <Text style={styles.subtitle}>Estado del servicio: operativo</Text>

      <View style={styles.actionsContainer}>
        <Pressable style={styles.actionButton} onPress={() => router.push("/(tabs)/rutas")}>
          <View style={styles.actionCircle}><Text>🚌</Text></View>
          <Text style={styles.actionText}>Rutas</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => router.push("/(tabs)/avisos")}>
          <View style={styles.actionCircle}><Text>🔔</Text></View>
          <Text style={styles.actionText}>Avisos</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => router.push("/(tabs)/favoritos")}>
          <View style={styles.actionCircle}><Text>⭐</Text></View>
          <Text style={styles.actionText}>Favoritos</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximo horario</Text>
        <Text style={styles.cardText}>Ruta 1 - 07:20</Text>
      </View>
    </ScrollView>
  );
}

type Colors = ReturnType<typeof useTheme>["colors"];

function makeStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text.dark,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.light,
      marginBottom: 30,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
      paddingHorizontal: 10,
    },
    actionButton: {
      alignItems: "center",
    },
    actionCircle: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
      backgroundColor: colors.background.card,
    },
    actionText: {
      fontSize: 14,
      color: colors.text.dark,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text.dark,
      marginBottom: 15,
    },
    cardText: {
      fontSize: 16,
      color: colors.text.dark,
    },
  });
}
