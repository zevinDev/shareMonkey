import React from "react";
import { View, Linking } from "react-native";
import { Layout, Button, Section, SectionContent } from "react-native-rapi-ui";

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
              onPress={() =>
                Linking.openURL(
                  "https://docs.google.com/document/d/1islII8aFrUpX8QuNwrhqWxEoy0qZib6THkdX4OoTjHI/edit?usp=sharing"
                )
              }
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
              onPress={() =>
                Linking.openURL(
                  "https://docs.google.com/document/d/1-3rgmJNG3j3tUugxHXUwFDY1Bw4bYt3JQTwiNz2Sc-8/edit"
                )
              }
            />
            <Button
              style={{ marginTop: 10 }}
              text="Log Out"
              leftContent={
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={"white"}
                />
              }
              status="danger"
              onPress={() => alert("Disabled for the presentation.")}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
