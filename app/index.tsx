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
  // ╾╼ * INFO: HOOK ╾──────────────────────────────────────────────────╼
  useEffect(() => {
    // ______________________________________________________________________
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log("🎇 NOTIFICATION RECEIVED");
      console.log(notification);
      // const userName = notification.request.content.data.userName;
      // console.log(userName);
    });

    // ______________________________________________________________________
    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("🎉 NOTIFICATION 👉 RESPONSE 👈 RECEIVED");
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log(userName);
    });

    // ______________________________________________________________________
    return () => {
      subscription1.remove();
      subscription2.remove();
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
