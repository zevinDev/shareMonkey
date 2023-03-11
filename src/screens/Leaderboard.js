import React from "react";
import { View } from "react-native";
import {
  Layout,
  Text,
  Picker,
  Section,
  SectionContent,
} from "react-native-rapi-ui";
import { getLeaderboard } from "../components/apiRefrences";

export default function ({ navigation }) {
  const [pickerValue, setPickerValue] = React.useState(null);
  const [leaderValue, setLeaderValue] = React.useState();

  const getSelectedLeader = async (leaderType) => {
    const oldLeaderData = leaderValue;
    const leaderData = await getLeaderboard(leaderType);
    if (oldLeaderData != leaderData) {
      setLeaderValue(leaderData);
    }
  };
  const DisplayLeader = () => {
    var field = [];
    if (leaderValue) {
      for (var i = 0; i < leaderValue.usernames.length; i++) {
        field.push(
          <Section
            key={leaderValue.usernames[i]}
            style={{
              width: "90%",
              marginTop: 10,
              alignSelf: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <SectionContent
              style={{ flexDirection: "row", alignSelf: "flex-end" }}
            >
              <Text
                size="xl"
                fontWeight="bold"
                key={leaderValue.usernames[i]}
                style={{ marginRight: 15 }}
              >
                {leaderValue.usernames[i]}:
              </Text>
              <Text
                size="xl"
                fontWeight="bold"
                key={leaderValue.points[i]}
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  paddingRight: 20,
                }}
              >
                {leaderValue.points[i]}
              </Text>
            </SectionContent>
          </Section>
        );
      }
      return field;
    } else {
      return <View></View>;
    }
  };

  const items = [
    { label: "Weekly Leaderboard", value: "weekly" },
    { label: "Monthly Leaderboard", value: "monthly" },
    { label: "All-Time Leaderboard", value: "all-time" },
  ];
  return (
    <Layout>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: -40,
        }}
      >
        <Picker
          borderWidth={3}
          placeholderSize="h2"
          items={items}
          value={pickerValue}
          placeholder="Choose Leaderboard"
          onValueChange={async (val) => {
            await getSelectedLeader(val);
            setPickerValue(val);
          }}
        />
      </View>
      <DisplayLeader />
    </Layout>
  );
}
