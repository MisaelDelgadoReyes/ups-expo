import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { mobileService } from "../../services/mobile.service";
import { Route } from "../../types/route";

export default function RutasScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
          value={search}
          onChangeText={setSearch}
        />
      </View>
      
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors.button.primary} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: Colors.background.card,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  list: {
    padding: 20,
    paddingTop: 10,
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
  cardSubtitle: {
    fontSize: 14,
    color: Colors.text.dark,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: Colors.text.light,
  },
  statusWarning: {
    color: Colors.warning,
    fontWeight: "bold",
  }
});
