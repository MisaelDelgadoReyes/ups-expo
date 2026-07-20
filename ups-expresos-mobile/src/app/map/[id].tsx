import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeText}>Mapa referencial, no tiempo real.</Text>
        </View>

        <View style={styles.mapArea}>
          {/* A simple placeholder representation of the map */}
          <Text style={styles.mapPlaceholder}>[ Mapa visual de las paradas 1 al 5 ]</Text>
        </View>

        <View style={styles.legendCard}>
          <Text style={styles.legendText}>Línea: recorrido</Text>
          <Text style={styles.legendText}>Puntos: paradas</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  noticeCard: {
    backgroundColor: Colors.background.card,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary, // Yellow border for notice
    marginBottom: 20,
    alignItems: "center",
  },
  noticeText: {
    color: Colors.text.dark,
    fontSize: 14,
    fontFamily: "Inter-Medium",
  },
  mapArea: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  mapPlaceholder: {
    color: Colors.text.light,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  legendCard: {
    backgroundColor: Colors.background.card,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  legendText: {
    color: Colors.text.dark,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 5,
  }
});
