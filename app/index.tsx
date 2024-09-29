import { StatusBar } from "expo-status-bar";
import { Button, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// ╾────────────────────────────────────────────────────────────────────╼
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function Index() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log("NOTIFICATION RECEIVED");
      console.log(notification);
      const userName = notification.request.content.data.userName;
      console.log(userName);
    })

    return () => {
      subscription.remove();
    }
  }, []);

  // ______________________________________________________________________
  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "👋 Welcome to the app!",
        body: "👋 Welcome to the app!",
        data: { userName: "Mic" },
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />

      <StatusBar style="auto" />
    </View>
  );
}
