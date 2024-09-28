import { StatusBar } from "expo-status-bar";
import { Button, View } from "react-native";
import * as Notifications from "expo-notifications";

export default function Index() {
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
