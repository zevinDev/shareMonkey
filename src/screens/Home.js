import { React, useState, useEffect } from "react";
import { View, ScrollView, TouchableHighlight, Share } from "react-native";
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
  getUser,
} from "../components/apiRefrences";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { isDarkmode, setTheme } = useTheme();
  const [username, setUsername] = useState("test1");
  const [token, setToken] = useState("8hl42ie18atptf2jkq42sm");
  const [liked, setLiked] = useState(false);
  const [state, setState] = useState();

  const handle = () => {
    AsyncStorage.setItem("Username", username);
    AsyncStorage.setItem("Token", token);
  };
  const renderPosts = (posts, userInfo) => {
    var fields = [];
    const starter = "   (@";
    const finisher = ")";
    for (let i = 0; i < posts.length; i++) {
      fields.push(
        <Section key={posts[i].postID} style={{ width: "100%", marginTop: 20 }}>
          <SectionContent style={{ flexDirection: "row" }}>
            <Avatar
              source={{
                uri: userInfo[i].profilePicture,
              }}
              size="md"
              shape="round"
            />
            <Text>
              {"    "}
              {userInfo[i].name} {"\n"} {starter} {posts[i].username} {finisher}
            </Text>
          </SectionContent>

          {displayPictures(posts[i].postPicture)}
          <SectionContent style={{ marginTop: -10 }}>
            <Text fontWeight="bold">
              {posts[i].username}: {posts[i].description}
            </Text>
          </SectionContent>
          <SectionContent style={{ flexDirection: "row", marginTop: -30 }}>
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
                    ? "#ffffff"
                    : "#000000"
                }
              />
            </TouchableHighlight>
            <Text> </Text>
            <TouchableHighlight
              onPress={async () => {
                console.log("test");
              }}
            >
              <Ionicons
                name={"chatbubble-outline"}
                style={{ marginBottom: -7 }}
                size={24}
                color={"#119e37"}
              />
            </TouchableHighlight>
            <Text> </Text>

            <TouchableHighlight
              onPress={async () => {
                Share.share(
                  {
                    title: "test title",
                    url: `https://fbla-backend.herokuapp.com/post/${posts[i].postID}`,
                  },
                  {
                    excludedActivityTypes: [
                      // 'com.apple.UIKit.activity.PostToWeibo',
                      // 'com.apple.UIKit.activity.Print',
                      // 'com.apple.UIKit.activity.CopyToPasteboard',
                      // 'com.apple.UIKit.activity.AssignToContact',
                      // 'com.apple.UIKit.activity.SaveToCameraRoll',
                      // 'com.apple.UIKit.activity.AddToReadingList',
                      // 'com.apple.UIKit.activity.PostToFlickr',
                      // 'com.apple.UIKit.activity.PostToVimeo',
                      // 'com.apple.UIKit.activity.PostToTencentWeibo',
                      // 'com.apple.UIKit.activity.AirDrop',
                      // 'com.apple.UIKit.activity.OpenInIBooks',
                      // 'com.apple.UIKit.activity.MarkupAsPDF',
                      // 'com.apple.reminders.RemindersEditorExtension',
                      // 'com.apple.mobilenotes.SharingExtension',
                      // 'com.apple.mobileslideshow.StreamShareService',
                      // 'com.linkedin.LinkedIn.ShareExtension',
                      // 'pinterest.ShareExtension',
                      // 'com.google.GooglePlus.ShareExtension',
                      // 'com.tumblr.tumblr.Share-With-Tumblr',
                      // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
                    ],
                  }
                );
              }}
            >
              <Ionicons
                name={"share-outline"}
                style={{ marginBottom: -7 }}
                size={24}
                color={"#118cd9"}
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
      fields.push(
        <SectionImage key={l} source={{ uri: picList[l] }} height={350} />
      );
    }
    return fields;
  }

  const handleFeed = async () => {
    const postList = await getFeed("test1");
    var newTest = JSON.parse(postList);
    var postInfo = [];
    var userInfo = [];
    for (var i = 0; i < newTest.length; i++) {
      var currentPost = await getPost(newTest[i]);
      var currentUser = await getUser(currentPost.username);
      postInfo[i] = currentPost;
      userInfo[i] = currentUser;
      for (var l = 0; l < postInfo[i].likes.length; l++) {
        var postLikes = postInfo[i].likes;
        if (postLikes[l] == (await AsyncStorage.getItem("Username"))) {
          postInfo[i].isLiked = true;
          break;
        } else postInfo[i].isLiked = false;
      }
      if (postInfo[i].likes.length == 0) postInfo[i].isLiked = false;
    }
    renderPosts(postInfo, userInfo);
    return;
  };

  const runOnce = () => {
    handleFeed();
    setTheme("light");
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
        </View>
      </Layout>
    </ScrollView>
  );
}
