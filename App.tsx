import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

Notifications.setNotificationHandler({
  handleNotification: async (notif) => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  React.useEffect(() => {
    requestPermissionsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Show notif"
        onPress={() => {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Look at that notification",
              body: "I'm so proud of myself!",
            },
            trigger: {
              seconds: 1,
            },
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
