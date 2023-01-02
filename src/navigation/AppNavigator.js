import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";


import Home from "../screens/Home";
import Post from "../screens/Post"
import SecondScreen from "../screens/SecondScreen";
import Search from "../screens/Search"
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Tabs" component={MainTabs} />
    </MainStack.Navigator>
  );
};

const MyDrawer = () => {
  const { isDarkmode } = useTheme();
  return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false,drawerStyle: {borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff"},drawerLabelStyle:{color: isDarkmode ? "#ffffff" : "#000000"}}}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="SecondScreen" component={SecondScreen} options={{ headerShown: false }} />
      </Drawer.Navigator>
  );
}

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={MyDrawer}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Search" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"search-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Post"
        component={Post}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Post" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"add-circle-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
