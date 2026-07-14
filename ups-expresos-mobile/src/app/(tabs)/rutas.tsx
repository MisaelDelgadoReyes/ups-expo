import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { mobileService } from "../../services/mobile.service";
import { Route } from "../../types/route";

export default function RutasScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { colors } = useTheme();

  const styles = makeStyles(colors);

  useEffect(() => {
    loadRoutes();
  }, [search]);

  const loadRoutes = async () => {
    try {
      setLoading(true);
      const response = await mobileService.getRoutes({ search: search || undefined });
      setRoutes(response.data);
    } catch (error) {
      console.error("Error loading routes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ruta"
          placeholderTextColor={colors.text.light}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.button.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {routes.map((route) => (
            <Pressable 
              key={route.id} 
              style={styles.card}
              onPress={() => router.push(`/route/${route.id}`)}
            >
              <Text style={styles.cardTitle}>{route.name}</Text>
              <Text style={styles.cardSubtitle}>{route.description || route.direction}</Text>
              <Text style={[styles.cardText, route.status !== 'ACTIVE' && styles.statusWarning]}>
                Estado: {route.status}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
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
    searchContainer: {
      padding: 20,
      paddingBottom: 10,
    },
    searchInput: {
      backgroundColor: colors.background.card,
      height: 50,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 15,
      fontSize: 16,
      color: colors.text.dark,
    },
    list: {
      padding: 20,
      paddingTop: 10,
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
    cardSubtitle: {
      fontSize: 14,
      color: colors.text.dark,
      marginBottom: 5,
    },
    cardText: {
      fontSize: 14,
      color: colors.text.light,
    },
    statusWarning: {
      color: colors.warning,
      fontWeight: "bold",
    }
  });
}
