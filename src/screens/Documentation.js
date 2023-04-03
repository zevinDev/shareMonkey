import { React } from "react";
import { WebView } from 'react-native-webview';

export default function ({ navigation }) {
  return (
  <WebView source={{ uri: 'https://github.com/REALziez/Frontend/#readme' }} style={{ flex: 1 }} />
  );
}
