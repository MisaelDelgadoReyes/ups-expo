import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

import {
  MapPin,
  Bell,
  Star,
} from "lucide-react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { colors } = useTheme();
  
  const styles = makeStyles(colors);
  const displayName = user?.email
  ? user.email
      .split("@")[0]
      .split(".")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")
  : "Estudiante";

return (
  <ScrollView
    style={styles.container}
    showsVerticalScrollIndicator={false}
  >
    {/* Encabezado azul */}
    {/* Encabezado azul */}
<View style={styles.header}>

  <View style={styles.headerLeft}>

    <View style={styles.nameRow}>

      <Text style={styles.greeting}>
        ¡Hola, {displayName}!
      </Text>

      <Pressable
        style={styles.notificationButton}
        onPress={() => router.push("/(tabs)/avisos")}
      >
        <Ionicons
          name="notifications-outline"
          size={28}
          color="#FFFFFF"
        />
      </Pressable>

    </View>

    <Text style={styles.welcome}>
      Bienvenido de nuevo
    </Text>

  </View>

</View>

    {/* Tarjeta resumen */}
    <View style={styles.summaryCard}>

      <Text style={styles.summaryTitle}>
        Resumen rápido
      </Text>

      <View style={styles.statusRow}>

        <View>
          <Text style={styles.statusLabel}>
            Estado del servicio
          </Text>

          <Text style={styles.statusDescription}>
            Todas las rutas en servicio
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>
            Operativo
          </Text>
        </View>

      </View>

    </View>
    {/* Accesos rápidos */}
    <View style={styles.quickActions}>

      <Pressable
        style={styles.quickCard}
        onPress={() => router.push("/(tabs)/rutas")}
      >
        <MapPin
          size={34}
          color="#2E4DB7"
          strokeWidth={2.2}
        />

        <Text style={styles.quickTitle}>
          Rutas
        </Text>

        <Text style={styles.quickSubtitle}>
          Ver todas
        </Text>
      </Pressable>

      <Pressable
        style={styles.quickCard}
        onPress={() => router.push("/(tabs)/avisos")}
      >
        <Bell
          size={34}
          color="#2E4DB7"
          strokeWidth={2.2}
        />

        <Text style={styles.quickTitle}>
          Avisos
        </Text>

        <Text style={styles.quickSubtitle}>
          Comunicados
        </Text>
      </Pressable>

      <Pressable
        style={styles.quickCard}
        onPress={() => router.push("/(tabs)/favoritos")}
      >
        <Star
          size={34}
          color="#2E4DB7"
          strokeWidth={2.2}
        />

        <Text style={styles.quickTitle}>
          Favoritos
        </Text>

        <Text style={styles.quickSubtitle}>
          Guardados
        </Text>
      </Pressable>

    </View>
    {/* Próximo horario cercano */}
<View style={styles.scheduleSection}>

  <Text style={styles.scheduleTitle}>
    Próximo horario cercano
  </Text>

  <Pressable
    style={styles.scheduleCard}
    onPress={() => router.push("/(tabs)/rutas")}
  >

    <View style={styles.blueLine} />

    <View style={styles.scheduleContent}>

      <View style={styles.scheduleInfo}>

        <Text style={styles.routeName}>
          Ruta 1 - Campus Norte
        </Text>

        <Text style={styles.routeFrom}>
          Desde: Portón Principal
        </Text>

        <Text style={styles.routeLabel}>
          Próximo horario
        </Text>

      </View>

      <View style={styles.scheduleRight}>

        <Text style={styles.routeHour}>
          07:20
        </Text>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#666"
        />

      </View>

    </View>

  </Pressable>

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
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontFamily: "Inter-Bold",
      color: colors.text.dark,
      marginBottom: 5,
    },
header: {
  backgroundColor: "#0056B8",
  paddingTop: 60,
  paddingHorizontal: 22,
  paddingBottom: 30,
},
headerLeft: {
  width: "100%",
},

nameRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

notificationButton: {
  paddingLeft: 12,
},
greeting: {
  fontSize: 24,
  fontFamily: "Inter-Bold",
  color: "#FFFFFF",
},
welcome: {
  color: "#D9E7FF",
  fontSize: 16,
  fontFamily: "Inter-Regular",
  marginTop: 4,
},
summaryCard: {
  backgroundColor: "#FFFFFF",
  marginHorizontal: 18,
  marginTop: -12,
  borderRadius: 18,
  padding: 20,
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
},
summaryTitle: {
  fontSize: 21,
  fontFamily: "Inter-Bold",
  color: colors.text.dark,
  marginBottom: 18,
},
statusRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
statusLabel: {
  fontFamily: "Inter-SemiBold",
  color: colors.text.dark,
},
statusDescription: {
  color: colors.text.light,
  fontFamily: "Inter-Regular",
  marginTop: 5,
},
statusBadge: {
  backgroundColor: "#DDF7E5",
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
},
statusBadgeText: {
  color: "#1E9E57",
  fontFamily: "Inter-Bold",
},
    subtitle: {
      fontSize: 16,
      fontFamily: "Inter-Regular",
      color: colors.text.light,
      marginBottom: 30,
    },
    actionsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 30,
      paddingHorizontal: 10,
    },
    actionButton: {
      alignItems: "center",
    },
    actionCircle: {
      width: 70,
      height: 70,
      borderRadius: 35,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
      backgroundColor: colors.background.card,
    },
    actionText: {
      fontSize: 14,
      fontFamily: "Inter-Regular",
      color: colors.text.dark,
    },
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    cardTitle: {
      fontSize: 20,
      fontFamily: "Inter-Bold",
      color: colors.text.dark,
      marginBottom: 15,
    },
    cardText: {
      fontSize: 16,
      fontFamily: "Inter-Regular",
      color: colors.text.dark,
    },
    quickActions: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 22,
  marginHorizontal: 18,
},

quickCard: {
  width: "31%",
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 20,

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 2,
  },

  elevation: 2,
},

quickTitle: {
  marginTop: 12,
  fontSize: 15,
  fontFamily: "Inter-Bold",
  color: "#1E1E1E",
},

quickSubtitle: {
  marginTop: 4,
  fontSize: 12,
  fontFamily: "Inter-Regular",
  color: "#8B8B8B",
},
scheduleSection: {
  marginHorizontal: 18,
  marginTop: 26,
},

scheduleTitle: {
  fontSize: 21,
  fontFamily: "Inter-Bold",
  color: colors.text.dark,
  marginBottom: 14,
},

scheduleCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#ECECEC",
  overflow: "hidden",
  flexDirection: "row",

  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 5,
  elevation: 2,
},

blueLine: {
  width: 4,
  backgroundColor: "#2E4DB7",
},

scheduleContent: {
  flex: 1,
  paddingVertical: 16,
  paddingHorizontal: 16,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

scheduleInfo: {
  flex: 1,
},

routeName: {
  fontSize: 17,
  fontFamily: "Inter-Bold",
  color: colors.text.dark,
  marginBottom: 8,
},

routeFrom: {
  fontSize: 14,
  fontFamily: "Inter-Regular",
  color: colors.text.light,
  marginBottom: 8,
},

routeLabel: {
  fontSize: 14,
  fontFamily: "Inter-Regular",
  color: colors.text.light,
},

scheduleRight: {
  flexDirection: "row",
  alignItems: "center",
},

routeHour: {
  fontSize: 24,
  fontFamily: "Inter-Bold",
  color: colors.text.dark,
  marginRight: 6,
},
  });
}
