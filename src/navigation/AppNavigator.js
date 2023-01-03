import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
import { Icon } from 'react-native-elements'


import Home from "../screens/Home";
import Post from "../screens/Post"
import SecondScreen from "../screens/SecondScreen";
import Search from "../screens/Search"
import Profile from "../screens/Profile";
import Leaderboard from "../screens/Leaderboard";

const Drawer = createDrawerNavigator();

const MainStack = createNativeStackNavigator();

const Main = () => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true, headerStyle: {backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff"}
      }}
    >
      <MainStack.Screen name="MyDrawer" component={MyDrawer} options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <Icon 
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
              name='notifications-outline'
              type='ionicon'
              color={isDarkmode ? "#ffffff" : "#000000"}
              />
            ),
          }} />
    </MainStack.Navigator>
  );
};

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../../assets/favicon.png')}
    />
  );
}

const MyDrawer = () => {
  const { isDarkmode } = useTheme();
  return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false, drawerPosition:"right", drawerStyle: {borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff"},drawerLabelStyle:{color: isDarkmode ? "#ffffff" : "#000000"}}}>
        <Drawer.Screen name="Notification" component={MainTabs} />
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
        component={Home}
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
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Leaderboard" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"podium-outline"} />
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
