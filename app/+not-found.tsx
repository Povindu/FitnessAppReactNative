import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Path Not Found" }} />
      <View>
        <Link href="/">Go back</Link>
      </View>
    </>
  );
}
