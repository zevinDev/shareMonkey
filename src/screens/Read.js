import { React } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-rapi-ui";

export default function ({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: "100%" }}
      >
        <Text> ReadMe </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
