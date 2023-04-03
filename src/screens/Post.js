import { React, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  Text,
  TextInput,
  Section,
  SectionContent,
  Button,
} from "react-native-rapi-ui";
import { launchImageLibrary } from "react-native-image-picker";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createPost } from "../components/apiRefrences";

const firebaseConfig = {
  apiKey: "AIzaSyCbJ1aBhJNXyo3C2UGaP13y0QalbKjaw2o",
  authDomain: "sharemonkey-6a389.firebaseapp.com",
  projectId: "sharemonkey-6a389",
  storageBucket: "sharemonkey-6a389.appspot.com",
  messagingSenderId: "4733311474",
  appId: "1:4733311474:web:0ae4f651806d156878736b",
  measurementId: "G-6QN0S74BBB",
};

initializeApp(firebaseConfig);

export default function ({ navigation }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [test, setTest] = useState(null);
  const [postImage, setPostImage] = useState(false);

  const imageSelect = async () => {
    if (!postImage) {
      const temp = await launchImageLibrary({ mediaType: "photo" });
      setTest(temp);
    } else {
      setPostImage(null);
      setTest(null);
      const temp = await launchImageLibrary({ mediaType: "photo" });
      setTest(temp);
    }
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri.replace("file://", ""));
    const blob = await response.blob();
    return blob;
  };

  const uploadIma = async (image) => {
    const newImage = await fetchImageFromUri(image.uri);
    const storage = getStorage();
    const refs = ref(storage, image.fileName);
    await uploadBytes(refs, newImage);
    getDownloadURL(ref(storage, image.fileName))
      .then((url) => {
        setPostImage(url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (test && !test.didCancel && !postImage) {
    uploadIma(test.assets[0]);
  }

  const createNewPost = async () => {
    const newPost = await createPost(postImage, title, text);
    console.log(newPost);
  };

  const showImage = () => {
    return (
      <View>
        <Image
          style={{
            width: 400,
            height: 400,
          }}
          source={{
            uri: postImage,
          }}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 40,
    },
    scrollView: {
      backgroundColor: "white",
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Section
          style={{
            width: "90%",
            marginLeft: 20,
            marginRight: 20,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <SectionContent
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            {postImage && showImage()}
            <Button
              style={{ marginTop: 10 }}
              text="Select Images"
              color="red"
              status="primary"
              onPress={() => imageSelect()}
            />
            <Text style={{ marginTop: 5, marginBottom: 5 }}>Description</Text>
            <TextInput
              placeholder="Enter here..."
              value={title}
              onChangeText={(val) => setTitle(val)}
            />
            <Text style={{ marginTop: 5, marginBottom: 5 }}>Tag</Text>
            <TextInput
              placeholder="Enter here..."
              value={text}
              onChangeText={(val) => setText(val)}
            />
            <Button
              style={{ marginTop: 10 }}
              text="Post"
              status="primary"
              onPress={() => createNewPost()}
            />
          </SectionContent>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}
