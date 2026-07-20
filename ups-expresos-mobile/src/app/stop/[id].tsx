import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function StopDetailScreen() {
  const { id, routeId, stopOrder, estimatedArrivalMinutes, stopName, stopReference } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{stopName || 'Detalle de Parada'}</Text>
        <Text style={styles.subtitle}>Referencia: {stopReference || 'Sin referencia'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximo Bus</Text>
        <Text style={styles.timeText}>En {estimatedArrivalMinutes || '10'} min</Text>
        <Text style={styles.infoText}>Ruta ID: {routeId}</Text>
        <Text style={styles.infoText}>Parada #{stopOrder}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horarios aprox.</Text>
        <Text style={styles.sectionText}>06:50, 07:10, 07:30</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: Colors.text.dark,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.text.light,
  },
  section: {
    backgroundColor: Colors.background.card,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: Colors.text.dark,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.text.dark,
  },
  card: {
    backgroundColor: Colors.background.card,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: Colors.text.dark,
    marginBottom: 5,
  },
  timeText: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: Colors.primary,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.text.light,
  },
});
