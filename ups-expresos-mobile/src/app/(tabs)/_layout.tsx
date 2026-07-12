import { Tabs, useRouter } from "expo-router";
import { Text, View, ActivityIndicator, ColorValue } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";

// Basic Tab Bar Icon using text emojis
function TabBarIcon({ name, color }: { name: string; color: ColorValue }) {
  const iconMap: Record<string, string> = {
    "index": "🏠",
    "rutas": "🚌",
    "avisos": "🔔",
    "favoritos": "⭐",
    "perfil": "👤",
  };
  return <Text style={{ fontSize: 24, color }}>{iconMap[name] || "❓"}</Text>;
}

export default function TabLayout() {
  const { isAuthenticated, loading } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated]);

  if (loading || !isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background.main }}>
        <ActivityIndicator size="large" color={colors.button.primary} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#FFFFFF',
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.text.light,
        tabBarStyle: { backgroundColor: colors.background.card, borderTopColor: colors.border },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => <TabBarIcon name="index" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rutas"
        options={{
          title: "Rutas",
          tabBarIcon: ({ color }) => <TabBarIcon name="rutas" color={color} />,
        }}
      />
      <Tabs.Screen
        name="avisos"
        options={{
          title: "Avisos",
          tabBarIcon: ({ color }) => <TabBarIcon name="avisos" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <TabBarIcon name="favoritos" color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="perfil" color={color} />,
        }}
      />
    </Tabs>
  );
}
