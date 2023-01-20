import React from 'react';
import { View, Image, Linking } from 'react-native';
import { Layout, Text, Button, Section, SectionContent, Avatar } from 'react-native-rapi-ui';

import { Ionicons } from "@expo/vector-icons";
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function ({ navigation }) {
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
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
							onPress={() =>
								alert("Disabled for the presentation.")
							}
						/>
						<Button
							style={{ marginTop: 10 }}
							text="Preferences"
							leftContent={
								<Ionicons name="md-settings-outline" size={20} color={"white"} />
							}
							status="success"
							onPress={() =>
								alert("Disabled for the presentation.")
							}
						/>
						<Button
							style={{ marginTop: 10 }}
							text="Report a Bug"
							leftContent={
								<Ionicons name="md-bug-outline" size={20} color={"white"} />
							}
							status="warning"
							onPress={() =>
								navigation.navigate("Report")
							}
						/>
						<Button
							style={{ marginTop: 10 }}
							text="About the App"
							leftContent={
								<Ionicons name="information-circle-outline" size={20} color={"white"} />
							}
							status="info"
							onPress={() => Linking.openURL("https://docs.google.com/document/d/1islII8aFrUpX8QuNwrhqWxEoy0qZib6THkdX4OoTjHI/edit?usp=sharing")
							}
						/>
						<Button
							style={{ marginTop: 10 }}
							text="Licence"
							leftContent={
								<Ionicons name="information-circle-outline" size={20} color={"white"} />
							}
							status="info"
							onPress={() => Linking.openURL("https://docs.google.com/document/d/1J3qcj_f82YXiCPp9uWlE4vsweOkIZDmQnEzomcGVAt8/edit?usp=sharing")
							}
						/>
					</SectionContent>
				</Section>
			</View>
		</Layout>
	);
}
