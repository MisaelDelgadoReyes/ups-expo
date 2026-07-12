import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/Colors";

export default function FavoritosScreen() {
  const [activeTab, setActiveTab] = useState("Rutas");
  const tabs = ["Rutas", "Paradas", "Local"];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Pressable 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {activeTab === "Rutas" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ruta 1</Text>
            <Text style={styles.cardText}>Centenario - Campus</Text>
          </View>
        )}
        
        {activeTab === "Paradas" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Monay Shopping</Text>
            <Text style={styles.cardText}>Parada favorita</Text>
          </View>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Favoritos guardados en dispositivo.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  tabContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: Colors.background.card,
  },
  activeTab: {
    backgroundColor: Colors.button.primary,
    borderColor: Colors.button.primary,
  },
  tabText: {
    color: Colors.text.dark,
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.background.card,
    fontWeight: "bold",
  },
  list: {
    padding: 20,
    paddingTop: 0,
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
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.dark,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: Colors.text.light,
  },
  infoCard: {
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text.dark,
    textAlign: "center",
  }
});
