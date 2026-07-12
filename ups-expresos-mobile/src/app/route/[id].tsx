import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { mobileService } from "../../services/mobile.service";
import { RouteDetail } from "../../types/route";

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [route, setRoute] = useState<RouteDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadRouteDetail(id as string);
    }
  }, [id]);

  const loadRouteDetail = async (routeId: string) => {
    try {
      setLoading(true);
      const data = await mobileService.getRouteDetail(routeId);
      setRoute(data);
    } catch (error) {
      console.error("Error loading route details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.button.primary} />
      </View>
    );
  }

  if (!route) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error al cargar ruta</Text>
      </View>
    );
  }

  // Group schedules by day
  const schedulesByDay = route.schedules?.reduce((acc, curr) => {
    if (!acc[curr.dayOfWeek]) acc[curr.dayOfWeek] = [];
    acc[curr.dayOfWeek].push(curr);
    return acc;
  }, {} as Record<string, typeof route.schedules>) || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{route.name}</Text>
        <Pressable 
          style={styles.mapButton}
          onPress={() => router.push(`/map/${id}`)}
        >
          <Text style={styles.mapButtonText}>Ver mapa</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recorrido</Text>
        <Text style={styles.sectionText}>{route.description || route.direction}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paradas</Text>
        {route.stops?.map((stopInfo) => (
          <Pressable key={stopInfo.id} onPress={() => router.push({ pathname: `/stop/[id]`, params: { id: stopInfo.stop.id, routeId: route.id, stopOrder: stopInfo.stopOrder, estimatedArrivalMinutes: stopInfo.estimatedArrivalMinutes, stopName: stopInfo.stop.name, stopReference: stopInfo.stop.reference } })}>
            <Text style={styles.stopItem}>{stopInfo.stopOrder}. {stopInfo.stop.name}</Text>
          </Pressable>
        ))}
        {(!route.stops || route.stops.length === 0) && (
          <Text style={styles.sectionText}>No hay paradas registradas</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horarios</Text>
        {Object.entries(schedulesByDay).map(([day, schedules]) => (
          <View key={day} style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{day}</Text>
            <Text style={styles.sectionText}>
              {schedules.map(s => s.departureTime.substring(0, 5)).join(', ')}
            </Text>
          </View>
        ))}
        {(!route.schedules || route.schedules.length === 0) && (
          <Text style={styles.sectionText}>No hay horarios registrados</Text>
        )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text.dark,
    flex: 1,
  },
  mapButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: Colors.background.card,
  },
  mapButtonText: {
    fontSize: 14,
    color: Colors.text.dark,
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
    fontWeight: "bold",
    color: Colors.text.dark,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: Colors.text.dark,
    marginBottom: 5,
  },
  stopItem: {
    fontSize: 14,
    color: Colors.button.primary,
    marginBottom: 8,
    textDecorationLine: "underline",
  }
});
