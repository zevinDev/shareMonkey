import { View, Image, FlatList, ScrollView, StyleSheet } from "react-native";
import {
  Layout,
  Text,
  Section,
  SectionContent,
  Avatar,
  Button,
} from "react-native-rapi-ui";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }) {
  const [userData, setUserData] = useState(false);
  var user;
  const getUserData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem("userData"));
      if (value != user) {
        user = value;
        setUserData(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  getUserData();

  const POSTS = [
    { id: 1, image: require("../../examplepost.jpg") },
    { id: 2, image: require("../../examplepost.jpg") },
    { id: 3, image: require("../../examplepost.jpg") },
    { id: 4, image: require("../../examplepost.jpg") },
    { id: 5, image: require("../../examplepost.jpg") },
    { id: 6, image: require("../../examplepost.jpg") },
    { id: 7, image: require("../../examplepost.jpg") },
    { id: 8, image: require("../../examplepost.jpg") },
  ];

  const renderItem = ({ item }) => (
    <Image source={item.image} style={{ width: 120, height: 120, margin: 5 }} />
  );

  const styles = StyleSheet.create({
    postImage: {
      width: 150,
      height: 150,
      margin: 5,
      marginRight: 10,
      marginBottom: 10,
    },
  });
  if (userData) {
    return (
      <ScrollView>
        <Layout>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: -20,
            }}
          >
            <Section>
              <SectionContent style={{ flexDirection: "row" }}>
                <Avatar
                  style={{ alignSelf: "flex-start" }}
                  source={{ uri: userData.profilePicture }}
                  size="xl"
                  shape="round"
                />
                <Text fontWeight="bold" size="h3" style={{ marginLeft: 10 }}>
                  {userData.name}
                  {"\n"}
                  <Text style={{ color: "gray", fontSize: 20 }}>
                    @{userData.username}
                    {"\n"}
                    <Text style={{ color: "gray", fontSize: 17 }}>
                      {userData.followers.length} Followers
                    </Text>
                  </Text>
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <Button
                    text="Follow"
                    status="primary"
                    onPress={() => {
                      alert(
                        "This will eventually increase the follower count by +1"
                      );
                    }}
                    style={{ height: 40, marginTop: -20, marginLeft: 15 }}
                  />
                </View>
              </SectionContent>
              <SectionContent>
                <Text
                  fontWeight="bold"
                  size="lg"
                  style={{ marginTop: -40, alignSelf: "center" }}
                >
                  {"\n" + userData.description}
                </Text>
              </SectionContent>
            </Section>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
                marginTop: 20,
              }}
            >
              <Section style={{ flex: 1 }}>
                <SectionContent>
                  <Text fontWeight="bold" size="xl">
                    {"Posts"}
                  </Text>
                  <View style={{ flex: 2 }}>
                    <Section>
                      <SectionContent>
                        {/* whenClicked is a property not an event, per se. 
                  <FlatList
                    data={POSTS}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    style={{ paddingLeft: 10 }} 
                    contentContainerStyle={{ paddingBottom: 20 }} 
                  />
                  */}
                      </SectionContent>
                    </Section>
                  </View>
                </SectionContent>
              </Section>
            </View>
          </View>
        </Layout>
      </ScrollView>
    );
  } else {
    <View></View>;
  }
}
