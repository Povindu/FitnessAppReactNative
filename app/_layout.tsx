import { Stack } from "expo-router";
import ClickCountProvider from "./context/ClickCounterContext";

export default function RootLayout() {
  return (
    <ClickCountProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ClickCountProvider>
  );
}
