import { Tabs, useRouter } from "expo-router";
import { Text, View, ActivityIndicator, ColorValue } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef } from "react";

// ─── Ícono de la barra de pestañas ───────────────────────────────────────────
const TAB_ICONS: Readonly<Record<string, string>> = {
  index: "🏠",
  rutas: "🚌",
  avisos: "🔔",
  favoritos: "⭐",
  perfil: "👤",
};

function TabBarIcon({ name, color }: Readonly<{ name: string; color: ColorValue }>) {
  return <Text style={{ fontSize: 24, color }}>{TAB_ICONS[name] ?? "❓"}</Text>;
}

// ─── Funciones de ícono extraídas fuera del componente padre ─────────────────
function InicioIcon({ color }: Readonly<{ color: ColorValue }>) {
  return <TabBarIcon name="index" color={color} />;
}
function RutasIcon({ color }: Readonly<{ color: ColorValue }>) {
  return <TabBarIcon name="rutas" color={color} />;
}
function AvisosIcon({ color }: Readonly<{ color: ColorValue }>) {
  return <TabBarIcon name="avisos" color={color} />;
}
function FavoritosIcon({ color }: Readonly<{ color: ColorValue }>) {
  return <TabBarIcon name="favoritos" color={color} />;
}
function PerfilIcon({ color }: Readonly<{ color: ColorValue }>) {
  return <TabBarIcon name="perfil" color={color} />;
}

// ─── Layout principal de las pestañas ────────────────────────────────────────
export default function TabLayout() {
  const { isAuthenticated, loading } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();
  const redirecting = useRef(false);

  useEffect(() => {
    if (!loading && !isAuthenticated && !redirecting.current) {
      redirecting.current = true;
      router.replace("/");
    }
    if (isAuthenticated) {
      redirecting.current = false;
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background.main }}>
        <ActivityIndicator size="large" color={colors.button.primary} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: "#FFFFFF",
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text.light,
        tabBarStyle: {
          backgroundColor: colors.background.card,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <InicioIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="rutas"
        options={{
          title: "Rutas",
          tabBarIcon: ({ color }) => <RutasIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="avisos"
        options={{
          title: "Avisos",
          tabBarIcon: ({ color }) => <AvisosIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <FavoritosIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <PerfilIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
