import { View, Text, StyleSheet, Pressable, Switch, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useTheme, lightColors } from "../../context/ThemeContext";

export default function PerfilScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const styles = makeStyles(colors);

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado del perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.substring(0, 2).toUpperCase() ||
              user?.email.substring(0, 2).toUpperCase() ||
              "US"}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || "Estudiante"}</Text>
        <Text style={styles.subtitle}>{user?.role || "Estudiante"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Menú de opciones */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <View style={styles.menu}>
          <Pressable style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
            <Text style={styles.menuItemText}>👤  Datos personales</Text>
            <Text style={styles.menuItemChevron}>›</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
            <Text style={styles.menuItemText}>⚙️  Configuración</Text>
            <Text style={styles.menuItemChevron}>›</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.menuItemLast, pressed && styles.menuItemPressed]}>
            <Text style={styles.menuItemText}>❓  Ayuda y soporte</Text>
            <Text style={styles.menuItemChevron}>›</Text>
          </Pressable>
        </View>
      </View>

      {/* Sección Apariencia con Modo Oscuro */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.menu}>
          <View style={styles.menuItemRow}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemText}>
                {isDarkMode ? "🌙  Modo oscuro" : "☀️  Modo claro"}
              </Text>
              <Text style={styles.menuItemSubtext}>
                {isDarkMode ? "Activo" : "Inactivo"}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDarkMode ? colors.secondary : "#f4f3f4"}
            />
          </View>
        </View>
      </View>

      {/* Botón cerrar sesión */}
      <View style={styles.logoutContainer}>
        <Pressable
          style={({ pressed }) => [styles.logoutButton, pressed && { opacity: 0.75 }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

type Colors = ReturnType<typeof import("../../context/ThemeContext").useTheme>["colors"];

function makeStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    profileHeader: {
      alignItems: "center",
      paddingVertical: 36,
      paddingHorizontal: 20,
      backgroundColor: colors.primary,
    },
    avatar: {
      width: 84,
      height: 84,
      borderRadius: 42,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
      borderWidth: 3,
      borderColor: "#fff",
    },
    avatarText: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.primary,
    },
    name: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#FFFFFF",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: colors.secondary,
      marginBottom: 4,
      fontWeight: "600",
    },
    email: {
      fontSize: 13,
      color: "rgba(255,255,255,0.75)",
    },
    sectionContainer: {
      marginTop: 20,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.text.light,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
      marginLeft: 4,
    },
    menu: {
      backgroundColor: colors.background.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemLast: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    menuItemPressed: {
      backgroundColor: colors.background.alt,
    },
    menuItemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    menuItemLeft: {
      flex: 1,
    },
    menuItemText: {
      fontSize: 16,
      color: colors.text.dark,
      fontWeight: "500",
    },
    menuItemSubtext: {
      fontSize: 12,
      color: colors.text.light,
      marginTop: 2,
    },
    menuItemChevron: {
      fontSize: 22,
      color: colors.text.light,
      fontWeight: "300",
    },
    logoutContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: "center",
      paddingHorizontal: 16,
    },
    logoutButton: {
      backgroundColor: "transparent",
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      width: "100%",
      alignItems: "center",
      borderWidth: 2,
      borderColor: colors.error,
    },
    logoutButtonText: {
      fontSize: 16,
      color: colors.error,
      fontWeight: "bold",
      letterSpacing: 0.5,
    },
  });
}
