import React from "react";
import { View, Linking, DevSettings } from "react-native";
import { Layout, Button, Section, SectionContent } from "react-native-rapi-ui";
import RNRestart from "react-native-restart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section>
          <SectionContent>
            <Button
              style={{ marginTop: 10 }}
              text="Edit Profile"
              leftContent={
                <Ionicons name="ios-pencil" size={24} color={"white"} />
              }
              status="primary"
              onPress={() => alert("Disabled for the presentation.")}
            />
            <Button
              style={{ marginTop: 10 }}
              text="Preferences"
              leftContent={
                <Ionicons
                  name="md-settings-outline"
                  size={20}
                  color={"white"}
                />
              }
              status="success"
              onPress={() => alert("Disabled for the presentation.")}
            />
            <Button
              style={{ marginTop: 10 }}
              text="Report a Bug"
              leftContent={
                <Ionicons name="md-bug-outline" size={20} color={"white"} />
              }
              status="warning"
              onPress={() => navigation.navigate("Report")}
            />
            <Button
              style={{ marginTop: 10 }}
              text="About the App"
              leftContent={
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color={"white"}
                />
              }
              status="info"
              onPress={() => navigation.navigate("Read")}
            />
            <Button
              style={{ marginTop: 10 }}
              text="License"
              leftContent={
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color={"white"}
                />
              }
              status="info"
              onPress={() =>
                Linking.openURL(
                  "https://docs.google.com/document/d/1J3qcj_f82YXiCPp9uWlE4vsweOkIZDmQnEzomcGVAt8/edit?usp=sharing"
                )
              }
            />
            <Button
              style={{ marginTop: 10 }}
              text="Documentation"
              leftContent={
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color={"white"}
                />
              }
              status="info"
              onPress={() => navigation.navigate("Documentation")}
            />
            <Button
              style={{ marginTop: 10 }}
              text="Log Out"
              leftContent={
                <Ionicons name="warning-outline" size={20} color={"white"} />
              }
              status="danger"
              onPress={() => {
                AsyncStorage.removeItem("userData");
                DevSettings.reload();
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
