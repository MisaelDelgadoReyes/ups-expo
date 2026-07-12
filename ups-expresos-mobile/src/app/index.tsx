import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const { width } = Dimensions.get("window");

/**
 * Componente que renderiza el logo institucional de la UPS
 * Versión en negativo (monocromática) para fondos oscuros
 * según el Manual de Identidad Corporativa (Pág. 15).
 */
function UPSLogoNegative() {
  return (
    <View style={logoStyles.container}>
      {/* Escudo / Emblema */}
      <View style={logoStyles.shieldWrapper}>
        <View style={logoStyles.shield}>
          {/* Cruz salesiana */}
          <View style={logoStyles.crossH} />
          <View style={logoStyles.crossV} />
          {/* Estrella central */}
          <View style={logoStyles.starCenter} />
        </View>
      </View>

      {/* Texto del logo */}
      <View style={logoStyles.textBlock}>
        <Text style={logoStyles.universidadText}>UNIVERSIDAD</Text>
        <Text style={logoStyles.politecnicaText}>POLITÉCNICA</Text>
        <Text style={logoStyles.salesiannaText}>SALESIANA</Text>
        <View style={logoStyles.divider} />
        <Text style={logoStyles.ecuadorText}>ECUADOR</Text>
      </View>
    </View>
  );
}

const logoStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  shieldWrapper: {
    width: 54,
    height: 62,
    backgroundColor: 'transparent',
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  shield: {
    width: 38,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  crossH: {
    position: "absolute",
    width: 24,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  crossV: {
    position: "absolute",
    width: 4,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  starCenter: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.primary, // Cutout for the star
  },
  textBlock: {
    flexDirection: "column",
  },
  universidadText: {
    fontSize: 11,
    fontWeight: "900",
    color: '#FFFFFF',
    letterSpacing: 1.5,
    lineHeight: 13,
  },
  politecnicaText: {
    fontSize: 11,
    fontWeight: "900",
    color: '#FFFFFF',
    letterSpacing: 1.5,
    lineHeight: 13,
  },
  salesiannaText: {
    fontSize: 11,
    fontWeight: "900",
    color: '#FFFFFF',
    letterSpacing: 1.5,
    lineHeight: 13,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
  },
  ecuadorText: {
    fontSize: 9,
    fontWeight: "700",
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: "center",
  },
});

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ── CONTENIDO PRINCIPAL ── */}
      <View style={styles.content}>
        
        {/* Logo Institucional (Blanco sobre Azul) */}
        <View style={styles.logoContainer}>
          <UPSLogoNegative />
        </View>

        {/* Textos de Bienvenida */}
        <View style={styles.textContainer}>
          <Text style={styles.appName}>
            UPS{"\n"}ExpresosApp
          </Text>
          
          <Text style={styles.tagline}>
            Tu ruta, tu tiempo,{"\n"}tu universidad.
          </Text>
          
          <Text style={styles.description}>
            Aplicación oficial para estudiantes de la Universidad Politécnica Salesiana. Consulta rutas, horarios, paradas y avisos del servicio de expresos universitarios.
          </Text>
        </View>

        {/* Spacer to push button to bottom */}
        <View style={{ flex: 1 }} />

        {/* Botón de Inicio de Sesión */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.buttonText}>Iniciar sesión    &gt;</Text>
        </Pressable>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // Fondo azul de la UPS
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: "flex-start",
    marginBottom: 40,
  },
  textContainer: {
    width: "100%",
  },
  appName: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 48,
    marginBottom: 24,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 28,
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.85,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

