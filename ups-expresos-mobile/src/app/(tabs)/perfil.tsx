import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
  StatusBar
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  const handleLogout = async () => {
    await logout();
  };

  const styles = makeStyles(colors);

  // Nombre derivado del correo si name no está disponible
  const displayName = user?.name
    ? user.name
    : user?.email
      ? user.email.split("@")[0].split(".").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Estudiante";

  // Iniciales derivadas del displayName
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Mapeo de rol a español
  const roleMap: Record<string, string> = {
    STUDENT: "Estudiante",
    ADMIN: "Administrador",
    SUPER_ADMIN: "Super Administrador",
    DRIVER: "Conductor",
  };
  const roleLabel = user?.role ? roleMap[user.role] ?? user.role : "Estudiante";

  return (
    <View style={styles.container}>
      {/* Fondo azul detrás de la cabecera */}
      <View style={styles.headerBackground} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título de Cabecera */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Mi perfil</Text>
        </View>

        {/* ── Tarjeta principal solapada ───────────────────────────── */}
        <View style={styles.card}>
          
          {/* Avatar + datos del usuario */}
          <View style={styles.profileBlock}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.userName}>
              {displayName}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || ""}
            </Text>
            
            <View style={styles.roleContainer}>
              <Text style={styles.userRole}>
                {roleLabel}
              </Text>
              <Text style={styles.userMajor}>
                Ingeniero/a en Ciencias de la Computación
              </Text>
            </View>
          </View>

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
                <Ionicons name="person-circle-outline" size={24} color="#0056B8" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>Datos personales</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.text.light} />
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
                <Ionicons name="settings-outline" size={24} color="#0056B8" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>Configuración</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.text.light} />
            </Pressable>

            {/* Ayuda y soporte */}
            <Pressable
              style={({ pressed }) => [
                styles.menuRow,
                styles.menuRowBorder, // Agregado borde extra como posible mejora o dejamos sin borde, según diseño
                pressed && styles.rowPressed,
              ]}
            >
              <View style={styles.menuLeft}>
                <Ionicons name="help-circle-outline" size={24} color="#0056B8" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>Ayuda y soporte</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.text.light} />
            </Pressable>

          </View>

          {/* ── Botón cerrar sesión ───────────────────────────────────── */}
          <View style={styles.logoutContainer}>
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

        </View>
      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
type ThemeColors = ReturnType<typeof useTheme>["colors"];

function makeStyles(colors: ThemeColors) {
  const statusBarHeight = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main, // Gris muy claro debajo
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: statusBarHeight + 100, // Alto suficiente para tapar detrás de la tarjeta
      backgroundColor: "#0056B8", // Azul base
    },
    topBar: {
      paddingTop: statusBarHeight,
      paddingBottom: 25,
      paddingHorizontal: 20,
    },
    topBarTitle: {
      color: "#FFFFFF",
      fontSize: 24,
      fontWeight: "bold",
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },

    // ── Tarjeta blanca ──────────────────────────────────────────────
    card: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      overflow: "hidden",
      paddingTop: 10,
    },

    // ── Bloque del perfil ───────────────────────────────────────────
    profileBlock: {
      alignItems: "center",
      paddingTop: 30,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    avatarCircle: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: "#0056B8", 
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 34,
      fontWeight: "bold",
      color: "#FFFFFF",
      letterSpacing: 1,
    },
    userName: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text.dark,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.text.light,
      marginBottom: 16,
    },
    roleContainer: {
      alignItems: 'center',
    },
    userRole: {
      fontSize: 14,
      color: colors.text.dark,
      fontWeight: "600",
      marginBottom: 2,
    },
    userMajor: {
      fontSize: 14,
      color: colors.text.light,
    },

    // ── Menú ────────────────────────────────────────────────────────
    menuGroup: {
      marginTop: 10,
      paddingHorizontal: 20,
    },
    menuRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 18,
    },
    menuRowBorder: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
    },
    menuLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuIcon: {
      marginRight: 15,
    },
    menuLabel: {
      fontSize: 16,
      color: colors.text.dark,
      fontWeight: "500",
    },
    rowPressed: {
      opacity: 0.55,
      backgroundColor: 'rgba(0,0,0,0.02)', // Un ligero fondo al hacer press
    },

    // ── Botón Cerrar sesión ─────────────────────────────────────────
    logoutContainer: {
      marginTop: 30,
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    logoutBtn: {
      paddingVertical: 11,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: colors.error, // Rojo
      alignItems: "center",
      backgroundColor: 'transparent',
    },
    logoutBtnPressed: {
      backgroundColor: colors.error + '1A', // Fondo rojo sutil al apretar
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.error,
    },
  });
}
