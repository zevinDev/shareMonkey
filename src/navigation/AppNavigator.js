import { React, useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, TouchableOpacity, Animated } from "react-native";

import {
  themeColor,
  useTheme,
  Text,
  Layout,
  Button,
} from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
import { Icon } from "react-native-elements";

import Home from "../screens/Home";
import Post from "../screens/Post";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Calendar from "../screens/Calendar";
import Leaderboard from "../screens/Leaderboard";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
// 397269680760-u130fkasmutr9td4gbh68t7duljuu2na.apps.googleusercontent.com
// 397269680760-fsddrkcsuq0cqu4q0g95l8b4m42si5hc.apps.googleusercontent.com
// 397269680760-0g3feigdksaqrhfmhlullr9tiiopbt6s.apps.googleusercontent.com

const Drawer = createDrawerNavigator();
const MainStack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();

export default () => {
  const [loggedIn, setloggedIn] = useState(false);

  const Main = () => {
    const { isDarkmode, setTheme } = useTheme();
    const navigation = useNavigation();

    return (
      <MainStack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: isDarkmode ? "#ffffff" : "#000000",
          },
        }}
      >
        <MainStack.Screen
          key="home"
          name="Home"
          component={MyDrawer}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => [
              <Icon
                key="calendar"
                onPress={() => navigation.navigate("Calendar")}
                name="calendar-outline"
                type="ionicon"
                color={isDarkmode ? "#ffffff" : "#000000"}
              />,
              <Text key="emptyText">     </Text>,
              <Icon
                key="notifications"
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                name="notifications-outline"
                type="ionicon"
                color={isDarkmode ? "#ffffff" : "#000000"}
              />,
            ],
          }}
        />
        <MainStack.Screen key="calendar" name="Calendar" component={Calendar} />
      </MainStack.Navigator>
    );
  };

  const LogoTitle = () => {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../assets/favicon.png")}
      />
    );
  };

  const MyDrawer = () => {
    const { isDarkmode } = useTheme();
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: "right",
          drawerStyle: {
            borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
        }}
      >
        <Drawer.Screen
          name="Notification"
          component={MainTabs}
          options={{ drawerItemStyle: { height: 0 } }}
        />
      </Drawer.Navigator>
    );
  };

  const renderFields = (notifications) => {
    const { isDarkmode } = useTheme();
    const notification = notifications;
    const fields = [];
    for (let i = 0; i < notification.length; i++) {
      fields.push(
        <DrawerItem
          key={notification[i]}
          label={notification[i]}
          labelStyle={{ color: isDarkmode ? "#ffffff" : "#000000" }}
        />
      );
    }
    return fields;
  };

  const notificationList = ["test1", "test2"];
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0 }}
        {...props}
      >
        <DrawerItemList {...props} />
        {renderFields(notificationList)}
      </DrawerContentScrollView>
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

  const LogInPage = () => {
    const { isDarkmode } = useTheme();
    const { accessToken, setAccessToken } = useState(null);
    const { user, setUser } = useState(null);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId:
        "397269680760-u130fkasmutr9td4gbh68t7duljuu2na.apps.googleusercontent.com",
      iosClientId:
        "397269680760-fsddrkcsuq0cqu4q0g95l8b4m42si5hc.apps.googleusercontent.com",
      androidClientId:
        "397269680760-0g3feigdksaqrhfmhlullr9tiiopbt6s.apps.googleusercontent.com",
    });

    useEffect(() => {
      if (response?.type === "success") {
        setAccessToken(response.authentication.accessToken);
        accessToken && fetchUserInfo();
      }
    }, [response, accessToken]);

    async function fetchUserInfo() {
      let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const useInfo = await response.json();
      setUser(useInfo);
    }

    const ShowUserInfo = () => {
      if (user) {
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}
            >
              Welcome
            </Text>
            <Image
              source={{ uri: user.picture }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {user.name}
            </Text>
          </View>
        );
      }
    };

    const Test = () => {
      /*
      const [fadeAnim] = useState(new Animated.Value(0));

      useEffect(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
          }
        ).start();
      }, []);
      */

      return (
        <Animated.View
          style={{
            flexDirection: 'column',
            height: 745,
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            //opacity: fadeAnim,
          }}
        >
          {user && <ShowUserInfo />}
          {user == null && (
            <>
              <Image source={require("../../logo.jpg")} style={{ width: 65, height: 65 }} />
              <Text></Text>
              <Text style={{ fontSize: 35, alignItems: 'center', justifyContent: 'center', fontWeight: "bold" }}> Welcome to ShareMonkey</Text>
              <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 20, color: "gray" }}> Please Log In</Text>
              <TouchableOpacity disabled={!request} onPress={() => { promptAsync(); }}>
                <Image source={require("../../btn.png")} style={{ width: 300, height: 40 }} />
              </TouchableOpacity>
            </>
          )}
          <Button text="Skip Log In" onPress={() => { setloggedIn(true); }} style={{ marginTop: 10 }} />
        </Animated.View>
  );
    };
    return (
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          },
        }}
      >
        <MainStack.Screen name="Log In to ShareMonkey" component={Test} />
      </MainStack.Navigator>
    );
  };

  if (loggedIn) {
    return (
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <LogInPage />
      </NavigationContainer>
    );
  }
};
