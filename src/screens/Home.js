import { maxWidth } from "@mui/system";
import {React, useState, useEffect} from "react";
import { View, Linking, ScrollView, Image, Dimensions } from "react-native";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
} from "react-native-rapi-ui";
import { getFeed, getPost } from "../components/apiRefrences";

export default function ({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { isDarkmode, setTheme } = useTheme();

  const renderPosts = (posts) => {
    var fields = [];
    const starter = " (@"
    const finisher = ")"
    for (let i=0; i < posts.length; i++) {
        fields.push(
          <Section key = {posts[i].postID} style = {{width:"100%", height: Dimensions.get('window').width}}>
          <SectionContent>
          <Text>
            {posts[i].name} {starter} {posts[i].username} {finisher}
          </Text>
          <Image
            style={{width:"100%", aspectRatio:1}}
            source={{uri: 'https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg'}}
          />
          </SectionContent>
          </Section>
        );
    }
    setPosts(fields)
    return;
    }
    
    const handleFeed = async (username) => {
      const postList = await getFeed(username);
      var newTest = JSON.parse(postList);
      var postInfo = [];
      for(var i = 0; i < newTest.length; i++){
        var currentPost = await getPost(newTest[i]);
        postInfo[i] = currentPost;
      }
      renderPosts(postInfo)
      return;
    };
    
    const runOnce = () => {handleFeed("test1"); return;}

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

        {useEffect(() => {runOnce();}, [])}
        {posts}
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
