import {React, useState} from 'react';
import { View } from 'react-native';
import { Layout, Text, TextInput, Section, SectionContent, Button } from 'react-native-rapi-ui';

export default function ({ navigation }) {
	const [text, setText] = useState();
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
			>
				<Section style={{ width: "90%",alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: -40}}>
                  <SectionContent style={{ alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
                    <TextInput
						rightContent={
							<Button
							style={{position:"absolute", right:0}}
							text="Search"
							status="primary"
							onPress={() =>
							  alert("Disabled for the presentation.")
							}
						  />
						}
                        placeholder="Enter here..."
                        value={text}
                        onChangeText={(val) => setText(val)}
                    />


                  </SectionContent>
                </Section>
			</View>
		</Layout>
	);
}
