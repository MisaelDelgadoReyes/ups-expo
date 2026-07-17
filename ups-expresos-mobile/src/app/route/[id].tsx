import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { mobileService } from "../../services/mobile.service";
import { RouteDetail } from "../../types/route";
import { Ionicons } from "@expo/vector-icons";

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colors } = useTheme();

  const [route, setRoute] = useState<RouteDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const styles = makeStyles(colors);

  useEffect(() => {
    if (id) {
      loadRouteDetail(id as string);
    }
  }, [id]);

  const loadRouteDetail = async (routeId: string) => {
    try {
      setLoading(true);
      const data = await mobileService.getRouteDetail(routeId);
      // ✅ Corrección: el backend devuelve { route, stops, schedules } no un RouteDetail directo
      setRoute({ ...data.route, stops: data.stops, schedules: data.schedules });
    } catch (error) {
      console.error("Error loading route details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background.main }}>
        <ActivityIndicator size="large" color={colors.button.primary} />
      </View>
    );
  }

  if (!route) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background.main }}>
        <Text style={{ color: colors.text.light }}>Error al cargar la ruta.</Text>
      </View>
    );
  }

  // Agrupar horarios por día
  const schedulesByDay = route.schedules?.reduce((acc, curr) => {
    if (!acc[curr.dayOfWeek]) acc[curr.dayOfWeek] = [];
    acc[curr.dayOfWeek].push(curr);
    return acc;
  }, {} as Record<string, typeof route.schedules>) || {};

  const dayLabels: Record<string, string> = {
    MONDAY: "Lunes", TUESDAY: "Martes", WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves", FRIDAY: "Viernes", SATURDAY: "Sábado", SUNDAY: "Domingo",
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>{route.name}</Text>
        <Pressable style={styles.mapButton} onPress={() => router.push(`/map/${id}`)}>
          <Ionicons name="map-outline" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Recorrido */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recorrido</Text>
        <Text style={styles.sectionText}>{route.description || route.direction}</Text>
      </View>

      {/* Paradas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paradas</Text>
        {route.stops && route.stops.length > 0 ? (
          route.stops.map((stopInfo) => (
            <Pressable
              key={stopInfo.id}
              style={styles.stopItem}
              onPress={() =>
                router.push({
                  pathname: `/stop/[id]`,
                  params: {
                    id: stopInfo.stop.id,
                    routeId: route.id,
                    stopOrder: stopInfo.stopOrder,
                    estimatedArrivalMinutes: stopInfo.estimatedArrivalMinutes,
                    stopName: stopInfo.stop.name,
                    stopReference: stopInfo.stop.reference,
                  },
                })
              }
            >
              <View style={styles.stopNumber}>
                <Text style={styles.stopNumberText}>{stopInfo.stopOrder}</Text>
              </View>
              <View style={styles.stopTextCol}>
                <Text style={styles.stopName}>{stopInfo.stop.name}</Text>
                {stopInfo.stop.reference && (
                  <Text style={styles.stopRef}>{stopInfo.stop.reference}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.text.light} />
            </Pressable>
          ))
        ) : (
          <Text style={styles.sectionText}>No hay paradas registradas.</Text>
        )}
      </View>

      {/* Horarios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horarios</Text>
        {Object.entries(schedulesByDay).length > 0 ? (
          Object.entries(schedulesByDay).map(([day, schedules]) => (
            <View key={day} style={styles.dayBlock}>
              <Text style={styles.dayLabel}>{dayLabels[day] ?? day}</Text>
              <Text style={styles.dayTimes}>
                {schedules.map((s) => s.departureTime.substring(0, 5)).join("  ·  ")}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.sectionText}>No hay horarios registrados.</Text>
        )}
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
      paddingBottom: 40,
    },
    header: {
      backgroundColor: "#0056B8",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: 55,
      paddingBottom: 16,
      paddingHorizontal: 16,
    },
    backBtn: {
      marginRight: 12,
    },
    headerTitle: {
      flex: 1,
      fontSize: 20,
      fontWeight: "bold",
      color: "#FFFFFF",
    },
    mapButton: {
      padding: 6,
    },
    section: {
      backgroundColor: "#FFFFFF",
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 4,
      elevation: 1,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text.dark,
      marginBottom: 12,
    },
    sectionText: {
      fontSize: 14,
      color: colors.text.light,
      lineHeight: 20,
    },
    stopItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    stopNumber: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: "#EBF2FF",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    stopNumberText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#0056B8",
    },
    stopTextCol: {
      flex: 1,
    },
    stopName: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text.dark,
    },
    stopRef: {
      fontSize: 12,
      color: colors.text.light,
      marginTop: 2,
    },
    dayBlock: {
      marginBottom: 12,
    },
    dayLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text.dark,
      marginBottom: 4,
    },
    dayTimes: {
      fontSize: 14,
      color: colors.text.light,
      lineHeight: 20,
    },
  });
}
