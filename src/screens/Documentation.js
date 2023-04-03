import { React } from "react";
import { WebView } from "react-native";

export default function ({ navigation }) {
  return (
    <WebView
    source={{uri: 'https://github.com/REALziez/Frontend/#readme'}}
    style={{marginTop: 20}}
  />
  );
}
