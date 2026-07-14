import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { authService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

type Step = 'email' | 'code';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestCode = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor ingresa tu correo institucional");
      return;
    }
    
    setIsLoading(true);
    try {
      await authService.requestCode(email);
      // Avanzamos al paso de código si se envió correctamente
      setStep('code');
      // Solo en entorno de desarrollo se podría mostrar en consola:
      // if (response.devCode) console.log("OTP Dev Code:", response.devCode);
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.message || "Ocurrió un error al solicitar el código";
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      Alert.alert("Error", "El código debe tener 6 dígitos");
      return;
    }

    setIsLoading(true);
    try {
      // 1. Verificar el código con el backend
      const response = await authService.verifyCode(email, code);

      // 2. Validar que los tokens existan
      const accessToken = response.accessToken ? String(response.accessToken) : null;
      const refreshToken = response.refreshToken ? String(response.refreshToken) : null;

      if (!accessToken || !refreshToken) {
        Alert.alert("Error", "La respuesta del servidor no contiene los tokens de sesión. Intenta de nuevo.");
        return;
      }

      // 3. Guardar tokens y datos de usuario localmente mediante AuthContext
      await login(accessToken, refreshToken, response.user as any);

      // 4. Navegar a los tabs
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error('Error en verificación:', error);
      // Distinguir error de red/servidor vs error local
      const message = error.response?.data?.message || error.message || "Código incorrecto o expirado";
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.content}>

      <Text style={styles.title}>
        Iniciar sesión
      </Text>

      <Text style={styles.subtitle}>
        Accede con tu correo institucional UPS.
      </Text>

      {step === "email" ? (
        <>
          <Text style={styles.label}>
            Correo institucional
          </Text>

<View style={styles.inputContainer}>
  <Image
    source={require("../../../assets/images/images_busapp/correo.png")}
    style={styles.inputIcon}
    resizeMode="contain"
  />

  <TextInput
    style={styles.input}
    placeholder="usuario@est.ups.edu.ec"
    placeholderTextColor={Colors.text.light}
    value={email}
    onChangeText={setEmail}
    autoCapitalize="none"
    keyboardType="email-address"
    editable={!isLoading}
  />
</View>

          <Pressable
            style={styles.loginButton}
            onPress={handleRequestCode}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>
                Enviar código
              </Text>
            )}
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.label}>
            Código de verificación
          </Text>

          <Text style={styles.infoText}>
            Enviado a {email}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="123456"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
          />

          <Pressable
            style={styles.loginButton}
            onPress={handleVerifyCode}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>
                Verificar código
              </Text>
            )}
          </Pressable>
        </>
      )}

    </View>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text.dark,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    paddingTop: 100,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.dark,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  height: 55,
  borderWidth: 1,
  borderColor: Colors.border,
  borderRadius: 12,
  paddingHorizontal: 16,
  marginBottom: 24,
  backgroundColor: "#FFFFFF",
},
inputIcon: {
  width: 18,
  height: 18,
  marginRight: 12,
  tintColor: Colors.text.light,
},
  subtitle: {
    fontSize: 15,
    color: Colors.text.light,
    marginBottom: 40,
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.dark,
    marginBottom: 10,
  },
  infoText: {
    color: Colors.text.light,
    marginBottom: 20,
  },
input: {
  flex: 1,
  fontSize: 16,
  color: Colors.text.dark,
},
  loginButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: Colors.button.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  backButton: {
    marginTop: 15,
    padding: 10,
  },
  backButtonText: {
    color: Colors.button.primary,
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});