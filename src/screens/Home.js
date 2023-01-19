import { React, useState, useEffect } from "react";
import { View, Linking, ScrollView, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  SectionImage,
  useTheme,
  Avatar,
} from "react-native-rapi-ui";
import {
  getFeed,
  getPost,
  likePost,
  dislikePost,
} from "../components/apiRefrences";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState("test1");
  const [token, setToken] = useState("8hl42ie18atptf2jkq42sm");
  const [liked, setLiked] = useState(false);

  const handle = () => {
    AsyncStorage.setItem("Username", username);
    AsyncStorage.setItem("Token", token);
  };
  const renderPosts = (posts) => {
    var fields = [];
    const starter = "   (@";
    const finisher = ")";
    for (let i = 0; i < posts.length; i++) {
      fields.push(
        <Section key={posts[i].postID} style={{ width: "100%" }}>
          <SectionContent style={{ flexDirection: "row" }}>
            <Avatar
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwme89cM8YZvHcybGrZl_Obd9U9p5QabozJQ&usqp=CAU",
              }}
              size="md"
              shape="round"
            />
            <Text>
              {"    "}
              {posts[i].name} {"\n"} {starter} {posts[i].username} {finisher}
            </Text>
          </SectionContent>
          {displayPictures(posts[i].postPicture)}
          <SectionContent style={{ flexDirection: "row" }}>
            <TouchableHighlight
              onPress={async () => {
                if (posts[i].isLiked == false) {
                  await likePost(
                    posts[i].postID,
                    await AsyncStorage.getItem("Username"),
                    await AsyncStorage.getItem("Token")
                  );
                } else {
                  await dislikePost(
                    posts[i].postID,
                    await AsyncStorage.getItem("Username"),
                    await AsyncStorage.getItem("Token")
                  );
                }
                setLiked(true);
              }}
            >
              <Ionicons
                name={posts[i].isLiked ? "heart" : "heart-outline"}
                style={{ marginBottom: -7 }}
                size={24}
                color={
                  posts[i].isLiked
                    ? "#CE4343"
                    : isDarkmode
                    ? "#000000"
                    : "#ffffff"
                }
              />
            </TouchableHighlight>
          </SectionContent>
        </Section>
      );
    }
    setPosts(fields);
    return;
  };

  function displayPictures(picList) {
    var fields = [];
    for (let l = 0; l < picList.length; l++) {
      fields.push(<SectionImage key={l} source={{ uri: picList[l] }} />);
    }
    return fields;
  }

  const handleFeed = async () => {
    const postList = await getFeed("test1");
    var newTest = JSON.parse(postList);
    var postInfo = [];
    for (var i = 0; i < newTest.length; i++) {
      var currentPost = await getPost(newTest[i]);
      postInfo[i] = currentPost;
      for (var l = 0; l < postInfo[i].likes.length; l++) {
        var postLikes = postInfo[i].likes;
        if (postLikes[l] == (await AsyncStorage.getItem("Username"))) {
          postInfo[i].isLiked = true;
          break;
        } else postInfo[i].isLiked = false;
      }
      if (postInfo[i].likes.length == 0) postInfo[i].isLiked = false;
    }
    renderPosts(postInfo);
    return;
  };

  const runOnce = () => {
    handleFeed();
    setTheme("dark");
    setLiked(false);
    return;
  };

  return (
    <ScrollView backgroundColor={isDarkmode ? "#191921" : "#f7f7f7"}>
      <Layout>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
            paddingTop: 20,
            top: -45,
          }}
        >
          {useEffect(() => {
            runOnce();
          }, [liked])}
          {posts}
          {useEffect(() => {
            handle();
          }, [])}

          <Section>
            <SectionContent>
              <Text fontWeight="bold" style={{ textAlign: "center" }}>
                These UI components provided by Rapi UI
              </Text>
              <Button
                style={{ marginTop: 10 }}
                text="Rapi UI Documentation"
                status="info"
                onPress={() =>
                  Linking.openURL("https://rapi-ui.kikiding.space/")
                }
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
                  runOnce();
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
