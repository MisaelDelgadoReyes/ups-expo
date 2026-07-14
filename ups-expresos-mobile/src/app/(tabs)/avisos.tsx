import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { mobileService } from "../../services/mobile.service";
import { Notice } from "../../types/notice";

export default function AvisosScreen() {
  const [activeTab, setActiveTab] = useState("Todos");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  const styles = makeStyles(colors);

  const tabs = ["Todos", "INFO", "WARNING", "CRITICAL"];

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      setLoading(true);
      const response = await mobileService.getNotices();
      setNotices(response.data);
    } catch (error) {
      console.error("Error loading notices", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = activeTab === "Todos" 
    ? notices 
    : notices.filter(notice => notice.severity === activeTab);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Pressable 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.button.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {filteredNotices.map((notice) => (
            <View key={notice.id} style={[styles.card, notice.severity === 'CRITICAL' && styles.cardCritical]}>
              <View style={styles.headerRow}>
                <Text style={styles.cardTitle}>{notice.title}</Text>
                <Text style={[styles.severityBadge, styles[`severity${notice.severity}` as keyof typeof styles]]}>
                  {notice.severity}
                </Text>
              </View>
              <Text style={styles.cardText}>{notice.message}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

type Colors = ReturnType<typeof useTheme>["colors"];

function makeStyles(colors: Colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.main,
    },
    tabContainer: {
      flexDirection: "row",
      padding: 20,
      justifyContent: "space-between",
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      marginHorizontal: 5,
      backgroundColor: colors.background.card,
    },
    activeTab: {
      backgroundColor: colors.button.primary,
      borderColor: colors.button.primary,
    },
    tabText: {
      color: colors.text.dark,
      fontSize: 14,
    },
    activeTabText: {
      color: "#FFFFFF",
      fontWeight: "bold",
    },
    list: {
      padding: 20,
      paddingTop: 0,
    },
    card: {
      backgroundColor: colors.background.card,
      padding: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 15,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text.dark,
      flex: 1,
    },
    cardText: {
      fontSize: 14,
      color: colors.text.light,
    },
    cardCritical: {
      borderColor: colors.error,
      borderWidth: 2,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10,
    },
    severityBadge: {
      fontSize: 10,
      fontWeight: 'bold',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      overflow: 'hidden',
      color: "#FFFFFF",
    },
    severityINFO: {
      backgroundColor: colors.info,
    },
    severityWARNING: {
      backgroundColor: colors.warning,
    },
    severityCRITICAL: {
      backgroundColor: colors.error,
    }
  });
}
