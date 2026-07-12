import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from "react-native";
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
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Iniciar sesión</Text>

        {step === 'email' ? (
          <>
            <Text style={styles.label}>Correo institucional UPS</Text>
            <TextInput
              style={styles.input}
              placeholder="usuario@est.ups.edu.ec"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />

            <Pressable 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleRequestCode}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.text.dark} />
              ) : (
                <Text style={styles.loginButtonText}>Solicitar código</Text>
              )}
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.label}>Código de verificación (6 dígitos)</Text>
            <Text style={styles.infoText}>Enviado a: {email}</Text>
            
            <TextInput
              style={styles.input}
              placeholder="123456"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              editable={!isLoading}
            />

            <Pressable 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleVerifyCode}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.text.dark} />
              ) : (
                <Text style={styles.loginButtonText}>Verificar código</Text>
              )}
            </Pressable>

            <Pressable 
              style={styles.backButton} 
              onPress={() => setStep('email')}
              disabled={isLoading}
            >
              <Text style={styles.backButtonText}>Usar otro correo</Text>
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
    backgroundColor: Colors.background.main,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: 'absolute',
    top: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.dark,
  },
  card: {
    backgroundColor: Colors.background.card,
    width: "85%",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.dark,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 14,
    color: Colors.text.light,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: Colors.text.dark,
    alignSelf: 'flex-start',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: Colors.background.card,
  },
  loginButton: {
    backgroundColor: Colors.background.card,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: Colors.text.dark,
    fontSize: 16,
    fontWeight: "500",
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