import React from 'react';
import { View, Image } from 'react-native';
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
					marginTop: -20
				}}
			>
			<Section>
					<SectionContent style={{flexDirection: "row"}} >
						<Avatar
							style={{alignSelf:"flex-start"}}
    						source={require('../../logo.png')}
    						size="xl"
   							shape="round"
						/>

						<Text fontWeight="bold" size="h3" style={{marginLeft: 10}}>{'Orange Monkey'}{'\n'}{'@theorangemonkey'}</Text>
						<TouchableHighlight
					style={{alignSelf:"flex-end"}}
              			onPress={async () => {
							navigation.navigate("Settings")
              		}}
            >
						<Ionicons name="settings-outline" size={20} color={"black"} />
						</TouchableHighlight>
						
					</SectionContent>
					<SectionContent >
					<Text fontWeight="bold" size="lg" style={{marginTop: -40, alignSelf:"center"}} >{'Official Account Of The Share Monkey Team'}</Text>
					</SectionContent>
				</Section>
					<Text fontWeight="bold" size="h3"> {"\n \n \n"} You Have No Posts {":("}</Text>
			</View>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
			</View>
		</Layout>
	);
}
