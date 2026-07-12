import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../../constants/Colors";
import { mobileService } from "../../services/mobile.service";
import { Notice } from "../../types/notice";

export default function AvisosScreen() {
  const [activeTab, setActiveTab] = useState("Todos");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

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
          <ActivityIndicator size="large" color={Colors.button.primary} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
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
    borderColor: Colors.border,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: Colors.background.card,
  },
  activeTab: {
    backgroundColor: Colors.button.primary,
    borderColor: Colors.button.primary,
  },
  tabText: {
    color: Colors.text.dark,
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.background.card,
    fontWeight: "bold",
  },
  list: {
    padding: 20,
    paddingTop: 0,
  },
  card: {
    backgroundColor: Colors.background.card,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.dark,
    flex: 1,
  },
  cardText: {
    fontSize: 14,
    color: Colors.text.light,
  },
  cardCritical: {
    borderColor: Colors.error,
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
    color: Colors.background.card,
  },
  severityINFO: {
    backgroundColor: Colors.info,
  },
  severityWARNING: {
    backgroundColor: Colors.warning,
  },
  severityCRITICAL: {
    backgroundColor: Colors.error,
  }
});
