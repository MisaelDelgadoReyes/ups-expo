import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { useEffect } from "react";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (loading || !navigationState?.key) return;

    // Check if user is navigating within the main tabs
    const inTabsGroup = segments[0] === "(tabs)";

    // Si no está autenticado y está dentro de las pestañas protegidas, regresamos a la pantalla de bienvenida
    if (!isAuthenticated && inTabsGroup) {
      if (router.canDismiss()) {
        router.dismissAll();
      } else {
        router.replace("/");
      }
    }
  }, [isAuthenticated, loading, segments, navigationState?.key]);

  return (
    <>
      <StatusBar style="dark" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="route/[id]" />
        <Stack.Screen name="map/[id]" />
        <Stack.Screen name="stop/[id]" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}