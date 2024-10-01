import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, View } from "react-native";
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
    // 👇 _______________________________________________________________ 👇
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Permission required", "Please enable notifications in your settings");
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId: process.env.PROJECT_ID || "",
      });
      console.log("👉 pushTokenData:", pushTokenData);
      // TODO:  ⚠ Send push token to backend

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    }
    // ______________________________________________________________________
    configurePushNotifications();
  }, []);


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

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[dmgKDNCRT5JB-hPdFoU_MM]",
        title: "TEST - Push Notification",
        body: "This a test!",
      }),
    })
  }

  // ══════════════════════════════════════════════════════════════════════
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />

      <StatusBar style="auto" />
    </View>
  );
}
