import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { colors } = useTheme();

  const styles = makeStyles(colors);

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
        
        {/* Logo Institucional (Imagen) */}
        <View style={styles.logoContainer}>
          <Image 
            source={require("../../assets/images/images_busapp/logo-ups.png")} 
            style={styles.logoUps} 
            resizeMode="contain" 
          />
          <Image
            source={require("../../assets/images/images_busapp/logo-busapp.png")}
            style={styles.appLogo}
            resizeMode="contain"
          />
        </View>

        {/* Textos de Bienvenida */}
        <View style={styles.textContainer}>
          <Text style={styles.tagline}>
            Tu ruta, tu tiempo,{"\n"}tu universidad.
          </Text>
        </View>

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

type ThemeColors = ReturnType<typeof useTheme>["colors"];

function makeStyles(colors: ThemeColors) {
  return StyleSheet.create({
    loadingContainer: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flex: 1,
      backgroundColor: colors.primary, // Fondo azul de la UPS
    },
    content: {
      flex: 1,
      justifyContent: "center",   // Centra verticalmente
      alignItems: "center",       // Centra horizontalmente
      paddingHorizontal: 36,
    },
    logoContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    logoUps: {
      width: 110,
      height: 110,
      marginBottom: 24,
    },
    appLogo: {
      width: 240,
      height: 80,
      marginBottom: 32,
    },
    textContainer: {
      alignItems: "center",
      marginBottom: 55,
    },
    tagline: {
      fontSize: 17,
      fontFamily: "Inter-Medium",
      color: colors.white,
      opacity: 0.8,
      textAlign: "center",
      lineHeight: 24,
    },
    description: {
      fontSize: 14,
      fontFamily: "Inter-Regular",
      color: "#FFFFFF",
      opacity: 0.85,
      lineHeight: 22,
    },
    button: {
      width: 220,
      height: 52,
      backgroundColor: "#FFFFFF",
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 5,
    },
    buttonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    buttonText: {
      color: colors.primary,
      fontSize: 18,
      fontFamily: "Inter-Bold",
      letterSpacing: 0.5,
    },
  });
}

