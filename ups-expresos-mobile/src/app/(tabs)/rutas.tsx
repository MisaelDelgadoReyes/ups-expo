import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { mobileService } from "../../services/mobile.service";
import { Route } from "../../types/route";
import { Ionicons } from "@expo/vector-icons";

export default function RutasScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const styles = makeStyles(colors);

const loadRoutes = useCallback(async () => {

  console.count("loadRoutes");

  try {
    setLoading(true);

    const term = debouncedSearch.trim();

    const response = await mobileService.getRoutes({
      search: term.length >= 2 ? term : undefined,
    });

    const data = Array.isArray(response)
      ? response
      : (response?.data ?? []);

    setRoutes(data);

  } catch (error: any) {
    console.log("STATUS:", error.response?.status);
    console.log("BODY:", JSON.stringify(error.response?.data, null, 2));
    console.log("PARAMS:", error.config?.params);

    setRoutes([]);
  } finally {
    setLoading(false);
  }
}, [debouncedSearch]);

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timer);
}, [search]);

  useEffect(() => {
    loadRoutes();
  }, [loadRoutes]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return { label: "Operativo", color: "#388E3C", bg: "#388E3C22" };
      case "SUSPENDED":
        return { label: "Suspendido", color: "#F57C00", bg: "#F57C0022" };
      default:
        return { label: "Inactivo", color: "#D32F2F", bg: "#D32F2F22" };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Azul */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rutas</Text>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={colors.text.light} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar rutas"
            placeholderTextColor={colors.text.light}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="options-outline" size={20} color={colors.text.light} />
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.button.primary} />
        </View>
      ) : routes.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: colors.text.light }}>No se encontraron rutas.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          <Text style={styles.sectionTitle}>Rutas activas</Text>
          {routes.map((route) => {
            const statusConfig = getStatusConfig(route.status);
            return (
              <Pressable
                key={route.id}
                style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
                onPress={() => router.push(`/route/${route.id}`)}
              >
                {/* Borde azul lateral */}
                <View style={styles.blueLine} />

                {/* Contenido */}
                <View style={styles.cardContent}>
                  <View style={styles.cardLeft}>
                    <Text style={styles.cardTitle}>{route.name}</Text>
                    <Text style={styles.cardDirection}>{route.direction}</Text>
                  </View>
                  <View style={styles.cardRight}>
                    <Ionicons name="star-outline" size={20} color={colors.text.light} />
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                      <Text style={[styles.statusText, { color: statusConfig.color }]}>
                        {statusConfig.label}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

type Colors = ReturnType<typeof useTheme>["colors"];

function makeStyles(colors: Colors) {
  const statusBarHeight =
    Platform.OS === "ios" ? 50 : StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    header: {
      backgroundColor: "#0056B8",
      paddingTop: statusBarHeight,
      paddingBottom: 16,
      paddingHorizontal: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontFamily: "Inter-Bold",
      color: "#FFFFFF",
    },
    searchWrapper: {
      backgroundColor: colors.background.main,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      height: 44,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 15,
      fontFamily: "Inter-Regular",
      color: colors.text.dark,
    },
    list: {
      paddingHorizontal: 16,
      paddingBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: "Inter-Bold",
      color: colors.text.dark,
      marginBottom: 12,
      marginTop: 4,
    },
    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ECECEC",
      flexDirection: "row",
      marginBottom: 12,
      overflow: "hidden",
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: 14,
    },
    cardLeft: {
      flex: 1,
      paddingRight: 10,
    },
    cardTitle: {
      fontSize: 16,
      fontFamily: "Inter-Bold",
      color: colors.text.dark,
      marginBottom: 4,
    },
    cardDirection: {
      fontSize: 13,
      fontFamily: "Inter-Regular",
      color: colors.text.light,
    },
    cardRight: {
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 10,
    },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    statusText: {
      fontSize: 11,
      fontFamily: "Inter-Bold",
    },
  });
}
