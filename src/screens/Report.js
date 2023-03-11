import { React, useState } from "react";
import { View } from "react-native";
import {
  Layout,
  Text,
  Button,
  Section,
  SectionContent,
  RadioButton,
  TextInput,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
  const [bug, setbug] = useState();
  const [pic, setpic] = useState();
  const [com, setcom] = useState();
  const [text, setText] = useState();
  return (
    <Layout>
      <Section>
        <SectionContent>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value={bug} onValueChange={(val) => setbug(val)} />
            <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
              Report Bug
            </Text>
          </View>
        </SectionContent>
        <SectionContent>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value={pic} onValueChange={(val) => setpic(val)} />
            <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
              Report Picture
            </Text>
          </View>
        </SectionContent>
        <SectionContent>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value={com} onValueChange={(val) => setcom(val)} />
            <Text size="md" style={{ marginLeft: 10, color: "gray" }}>
              Report Comment
            </Text>
          </View>
        </SectionContent>
        <SectionContent
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            rightContent={
              <Button
                style={{ position: "absolute", right: 0 }}
                text="Report"
                status="primary"
                onPress={() => {
                  setpic(false);
                  setbug(false);
                  setcom(false);
                  setText("");
                  alert("Report Sent.");
                }}
              />
            }
            placeholder="Enter here..."
            value={text}
            onChangeText={(val) => setText(val)}
          />
        </SectionContent>
      </Section>
    </Layout>
  );
}
