import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function FavoritosScreen() {
  const [activeTab, setActiveTab] = useState("Rutas");
  const tabs = ["Rutas", "Paradas", "Local"];
  const { colors } = useTheme();

  const styles = makeStyles(colors);

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

type Colors = ReturnType<typeof useTheme>["colors"];

function makeStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
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
      borderColor: colors.border,
      borderRadius: 20,
      marginHorizontal: 5,
      backgroundColor: colors.background.card,
    },
    activeTab: {
      backgroundColor: colors.button.primary,
      borderColor: colors.button.primary,
    },
    tabText: {
      color: colors.text.dark,
      fontSize: 14,
    },
    activeTabText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    list: {
      padding: 20,
      paddingTop: 0,
    },
    card: {
      backgroundColor: colors.background.card,
      padding: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 15,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text.dark,
      marginBottom: 10,
    },
    cardText: {
      fontSize: 14,
      color: colors.text.light,
    },
    infoCard: {
      padding: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 20,
    },
    infoText: {
      fontSize: 14,
      color: colors.text.dark,
      textAlign: "center",
    }
  });
}
