import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

// ─── Ícono SVG-como-View ───────────────────────────────────────────────────────
function ChevronRight({ color }: Readonly<{ color: string }>) {
  return <Text style={{ fontSize: 18, color, lineHeight: 22 }}>›</Text>;
}

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  const handleLogout = async () => {
    await logout();
  };

  const styles = makeStyles(colors);

  // Iniciales del avatar
  const initials =
    user?.name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() ||
    user?.email?.substring(0, 2).toUpperCase() ||
    "MB";

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Barra superior azul con título */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Mi perfil</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Tarjeta principal ─────────────────────────────────────── */}
        <View style={styles.card}>

          {/* Avatar + datos del usuario */}
          <View style={styles.profileBlock}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.userName}>
              {user?.name || "María Belén"}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || "maria.belen@est.ups.edu.ec"}
            </Text>
            <Text style={styles.userRole}>
              {user?.role || "Estudiante"}
            </Text>
            <Text style={styles.userMajor}>Ingeniería de Sistemas</Text>
          </View>

          {/* Línea divisoria */}
          <View style={styles.divider} />

          {/* ── Menú de opciones ──────────────────────────────────────── */}
          <View style={styles.menuGroup}>

            {/* Datos personales */}
            <Pressable
              style={({ pressed }) => [
                styles.menuRow,
                styles.menuRowBorder,
                pressed && styles.rowPressed,
              ]}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>👤</Text>
                <Text style={styles.menuLabel}>Datos personales</Text>
              </View>
              <ChevronRight color={colors.text.light} />
            </Pressable>

            {/* Configuración */}
            <Pressable
              style={({ pressed }) => [
                styles.menuRow,
                styles.menuRowBorder,
                pressed && styles.rowPressed,
              ]}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>⚙️</Text>
                <Text style={styles.menuLabel}>Configuración</Text>
              </View>
              <ChevronRight color={colors.text.light} />
            </Pressable>

            {/* Ayuda y soporte */}
            <Pressable
              style={({ pressed }) => [
                styles.menuRow,
                pressed && styles.rowPressed,
              ]}
            >
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>❓</Text>
                <Text style={styles.menuLabel}>Ayuda y soporte</Text>
              </View>
              <ChevronRight color={colors.text.light} />
            </Pressable>

          </View>

          {/* Línea divisoria */}
          <View style={styles.divider} />

          {/* ── Botón cerrar sesión ───────────────────────────────────── */}
          <Pressable
            style={({ pressed }) => [
              styles.logoutBtn,
              pressed && styles.logoutBtnPressed,
            ]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
type ThemeColors = ReturnType<typeof useTheme>["colors"];

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.primary, // #0065B0
    },
    topBar: {
      backgroundColor: colors.primary,
      paddingTop: 8,
      paddingBottom: 14,
      alignItems: "center",
    },
    topBarTitle: {
      color: "#FFFFFF",
      fontSize: 17,
      fontWeight: "700",
      letterSpacing: 0.3,
    },
    scroll: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 48,
    },

    // ── Tarjeta blanca ──────────────────────────────────────────────
    card: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.07,
      shadowRadius: 10,
      elevation: 3,
    },

    // ── Bloque del perfil ───────────────────────────────────────────
    profileBlock: {
      alignItems: "center",
      paddingTop: 28,
      paddingBottom: 24,
      paddingHorizontal: 20,
    },
    avatarCircle: {
      width: 78,
      height: 78,
      borderRadius: 39,
      backgroundColor: colors.button.primary, // #07508E
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      shadowColor: colors.button.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 4,
    },
    avatarText: {
      fontSize: 28,
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: 1,
    },
    userName: {
      fontSize: 19,
      fontWeight: "700",
      color: colors.text.dark,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 13,
      color: colors.text.light,
      marginBottom: 10,
    },
    userRole: {
      fontSize: 13,
      color: colors.text.dark,
      fontWeight: "600",
    },
    userMajor: {
      fontSize: 13,
      color: colors.text.light,
      marginTop: 2,
    },

    // ── Línea divisoria ─────────────────────────────────────────────
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginHorizontal: 16,
    },

    // ── Menú ────────────────────────────────────────────────────────
    menuGroup: {
      paddingHorizontal: 16,
      paddingVertical: 4,
    },
    menuRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 15,
    },
    menuRowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    menuLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    menuIcon: {
      fontSize: 18,
      width: 26,
      textAlign: "center",
    },
    menuLabel: {
      fontSize: 15,
      color: colors.text.dark,
      fontWeight: "500",
    },
    rowPressed: {
      opacity: 0.55,
    },

    // ── Botón Cerrar sesión ─────────────────────────────────────────
    logoutBtn: {
      marginHorizontal: 16,
      marginVertical: 20,
      paddingVertical: 13,
      borderRadius: 30,
      borderWidth: 1.5,
      borderColor: colors.error,
      alignItems: "center",
    },
    logoutBtnPressed: {
      opacity: 0.6,
    },
    logoutText: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.error,
      letterSpacing: 0.3,
    },
  });
}
