import { View, Text, StyleSheet, ScrollView, Pressable, Platform, StatusBar } from "react-native";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritosScreen() {
  const [activeTab, setActiveTab] = useState("Rutas");
  const tabs = ["Rutas", "Paradas"];
  const { colors } = useTheme();

  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      {/* Custom Blue Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritos</Text>
        
        {/* Custom Tabs inside Header */}
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
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        
        {/* Rutas */}
        {activeTab === "Rutas" && (
          <View>
            <Text style={styles.sectionTitle}>Mis rutas favoritas</Text>
            
            <View style={styles.card}>
              <View style={styles.blueLine} />
              <View style={styles.cardContent}>
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardTitle}>Ruta 1 - Campus Norte</Text>
                  <Text style={styles.cardSubtitle}>Ponciano Alto - Campus</Text>
                </View>
                <Ionicons name="star" size={24} color="#F2A900" />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.blueLine} />
              <View style={styles.cardContent}>
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardTitle}>Ruta 3 - Valle de los Chillos</Text>
                  <Text style={styles.cardSubtitle}>Conocoto - Campus</Text>
                </View>
                <Ionicons name="star-outline" size={24} color="#666" />
              </View>
            </View>
          </View>
        )}

        {/* Paradas */}
        {activeTab === "Paradas" && (
          <View>
            <Text style={styles.sectionTitle}>Mis paradas favoritas</Text>
            
            <View style={styles.card}>
              <View style={styles.blueLine} />
              <View style={styles.cardContent}>
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardTitle}>Monay Shopping</Text>
                  <Text style={styles.cardSubtitle}>Parada de Ruta 1, 3 y 5</Text>
                </View>
                <Ionicons name="star" size={24} color="#F2A900" />
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.blueLine} />
              <View style={styles.cardContent}>
                <View style={styles.cardTextCol}>
                  <Text style={styles.cardTitle}>Campus El Girón</Text>
                  <Text style={styles.cardSubtitle}>Parada final de varias rutas</Text>
                </View>
                <Ionicons name="star" size={24} color="#F2A900" />
              </View>
            </View>
          </View>
        )}

        {/* Info Box */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#0056B8" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Los favoritos se guardan en tu dispositivo y puedes consultarlos sin conexión.
          </Text>
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
      backgroundColor: colors.background.main, // Gris/blanco de fondo
    },
    header: {
      backgroundColor: "#0056B8", // Azul principal del index
      paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFFFFF",
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    tabContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderBottomWidth: 3,
      borderBottomColor: "transparent",
    },
    activeTab: {
      borderBottomColor: "#FFFFFF",
    },
    tabText: {
      color: "#D9E7FF",
      fontSize: 15,
      fontWeight: "500",
    },
    activeTabText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    list: {
      padding: 20,
      paddingTop: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text.dark,
      marginBottom: 12,
      marginTop: 10,
    },
    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ECECEC",
      overflow: "hidden",
      flexDirection: "row",
      marginBottom: 12,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 1,
    },
    blueLine: {
      width: 4,
      backgroundColor: "#2E4DB7",
    },
    cardContent: {
      flex: 1,
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardTextCol: {
      flex: 1,
      paddingRight: 10,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text.dark,
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 13,
      color: colors.text.light,
    },
    infoCard: {
      flexDirection: "row",
      backgroundColor: "#EBF2FF", // Azul pastel
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 20,
      marginBottom: 30,
    },
    infoIcon: {
      marginRight: 10,
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      color: "#0056B8", // Texto que hace match con el azul del header
      lineHeight: 18,
    },
  });
}
