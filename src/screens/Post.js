import React from 'react';
import { View } from 'react-native';
import { Layout, Text, TextInput, Section, SectionContent, Button } from 'react-native-rapi-ui';

export default function ({ navigation }) {
    const [text, setText] = React.useState('');
    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Section style={{ width: "90%", marginLeft: 20, marginRight: 20, alignItems: 'center', justifyContent: 'center', display: 'flex', position: 'absolute', top: 0, left: 0, right: 0 }}>
                  <SectionContent style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ marginBottom: 10 }}>Post Title</Text>
                    <TextInput
                        placeholder="Enter here..."
                        value={text}
                        onChangeText={(val) => setText(val)}
                    />
                    <Text></Text>
					<Button
                      style={{ marginTop: 10 }}
                      text="Select Images"
					  color="red"
                      status="primary"
                      onPress={() =>
                        alert("Disabled for the presentation.")
                      }
                    />
                    <Text></Text>
                    <Text style={{ marginBottom: 10 }}>Description/Tags</Text>
                    <TextInput
                        placeholder="Enter here..."
                        value={text}
                        onChangeText={(val) => setText(val)}
                    />
                    <Button
                      style={{ marginTop: 10 }}
                      text="Post"
                      status="primary"
                      onPress={() =>
                        alert("Disabled for the presentation.")
                      }
                    />
                  </SectionContent>
                </Section>
                
            </View>
        </Layout>
    );
}