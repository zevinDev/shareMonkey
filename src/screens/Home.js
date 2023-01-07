import React from "react";
import { View, Linking, ScrollView } from "react-native";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";

const renderPosts = (posts) => {
const fields = [];
for (let i=0; i < posts.length; i++) {
    fields.push(
      <Section key = {posts[i]}>
        <SectionContent>
      <Text>
        {posts[i]}
      </Text>
      </SectionContent>
      </Section>
    );
}
return fields;
}

function postDisplay() {
var postList = ["post 1", "post 2", "post 3", "post 4", "post 5", "post 6", "post 7", "post 8", "post 9"]
return (
  renderPosts(postList)
);
}


export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  return (
    <ScrollView backgroundColor = {isDarkmode ? "#191921" : "#f7f7f7"}>
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          paddingTop: 20,
          top: -45
        }}
      >
        {postDisplay()}
        <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              These UI components provided by Rapi UI
            </Text>
            <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
            <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              text="Pop Out"
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{
                marginTop: 10,
              }}
            />

            <Button
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              status={isDarkmode ? "success" : "warning"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
    </ScrollView>
  );
}
