import { React } from "react";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { Text } from "react-native-rapi-ui";

export default function ({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ height: "100%" }}
      >
        <Text size="h1" fontWeight="bold" style={{textAlign: 'center'}}> sharemonkey </Text>
        <Text size="h2" style={{textDecorationLine: 'underline'}}>What Is ShareMonkey?</Text>
        <Text size="lg">ShareMonkey is a mobile application designed for use in school districts and other similar enviroments. It is used to help share information between faculty members and students, as well as build school spirit. This is achieved through the ability of users to post images of themselves in attendance of school events and earn points for the in-app leaderboard. Additional information regarding the application and its features can be found in the INFORMATION file.</Text>
        <Text size="h2" style={{textDecorationLine: 'underline'}}>Credits</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <Text size="lg">Programming Tools {"\n"}</Text>
        <Image
        source={{
          uri: 'https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white',
        }}
      />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
