import { React, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import {
  ActivityIndicator,
  Image,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  themeColor,
  useTheme,
  Text,
  Button,
  TextInput,
  Picker,
} from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
import {
  titleText,
  animatedViewStyle,
  fadeProperties,
} from "../components/styles";
import { getUserFromID, createUser } from "../components/apiRefrences";
import { Icon } from "react-native-elements";

import Home from "../screens/Home";
import Post from "../screens/Post";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Calendar from "../screens/Calendar";
import Leaderboard from "../screens/Leaderboard";
import Settings from "../screens/Settings";
import Report from "../screens/Report";

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
    const { isDarkmode } = useTheme();
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
          name="Back"
          component={MyDrawer}
          options={{
            headerLeft: (props) => <LogoTitle {...props} />,
            headerTitle: () => [<Text key="emptyText"> </Text>],
            headerRight: () => [
              <Icon
                key="settings"
                onPress={() => navigation.navigate("Settings")}
                name="settings-outline"
                type="ionicon"
                color={isDarkmode ? "#ffffff" : "#000000"}
              />,
              <Text key="emptyText"> </Text>,
              <Text key="emptyText2"> </Text>,
              <Icon
                key="calendar"
                onPress={() => navigation.navigate("Calendar")}
                name="calendar-outline"
                type="ionicon"
                color={isDarkmode ? "#ffffff" : "#000000"}
              />,
              <Text key="emptyText3"> </Text>,
              <Text key="emptyText4"> </Text>,
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
        <MainStack.Screen key="settings" name="Settings" component={Settings} />
        <MainStack.Screen key="report" name="Report" component={Report} />
      </MainStack.Navigator>
    );
  };

  const LogoTitle = () => {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../../logo.png")}
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
          icon={({ size, color }) => (
            <Ionicons name="calendar-outline" size={20} color={"black"} />
          )}
          label={notification[i]}
          labelStyle={{ color: isDarkmode ? "#ffffff" : "#000000" }}
        />
      );
    }
    return fields;
  };

  const notificationList = [
    "FBLA State Leadership Conference",
    "Prom: Under the Tuscan Sky",
  ];
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
    const checkIfLoggedIn = async () => {
      try {
        const value = await AsyncStorage.getItem("userData");
        if (value) {
          setloggedIn(true);
        }
      } catch (e) {
        // error reading value
      }
    };

    checkIfLoggedIn();

    const { isDarkmode } = useTheme();
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [hasAccount, setHasAccount] = useState(null);
    const [creatingAccount, setCreatingAccount] = useState(null);
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

    const changeScreen = async () => {
      if (user) {
        await saveUserInfo("userData", JSON.stringify(user));
        setloggedIn(true);
      }
    };

    const getUserInfo = async () => {
      if (user) {
        const userInf = await getUserFromID(user.id);
        if (userInf) {
          setUser(userInf);
          setHasAccount(true);
          changeScreen();
        } else {
          setHasAccount(false);
        }
      }
    };

    const saveUserInfo = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
        return;
      } catch (e) {
        // saving error
      }
    };

    const LoggingIn = () => {
      getUserInfo();
      if (hasAccount == null) {
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
            <Text
              style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}
            >
              Logging You In
            </Text>
          </View>
        );
      } else {
        return <View></View>;
      }
    };

    const CreatingNewAccount = () => {
      if (creatingAccount == true) {
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size="large" />
            <Text
              style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}
            >
              Creating Your Account
            </Text>
          </View>
        );
      } else {
        return <View></View>;
      }
    };

    const CreateAccount = () => {
      if (hasAccount == false && creatingAccount == null) {
        const [name, setName] = useState("Full Name");
        const [username, setUsername] = useState("Username");
        const [school, setSchool] = useState("School");
        const [gradePickerValue, setGradePickerValue] = useState(null);
        const gradeItems = [
          { label: "9th Grade", value: "9" },
          { label: "10th Grade", value: "10" },
          { label: "11th Grade", value: "11" },
          { label: "12th Grade", value: "12" },
        ];
        const [rolePickerValue, setRolePickerValue] = useState(null);
        const roleItems = [
          { label: "Student", value: "student" },
          { label: "Parent", value: "parent" },
          { label: "Teacher", value: "teacher" },
        ];

        return (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                fontWeight: "bold",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Create a New Account
            </Text>
            <TextInput value={name} onChangeText={(val) => setName(val)} />
            <TextInput
              value={username}
              onChangeText={(val) => setUsername(val)}
            />
            <TextInput value={school} onChangeText={(val) => setSchool(val)} />
            <Picker
              borderWidth={1}
              items={roleItems}
              value={rolePickerValue}
              placeholder="Role"
              onValueChange={(val) => {
                setRolePickerValue(val);
              }}
            />
            {rolePickerValue == "student" && (
              <Picker
                borderWidth={1}
                items={gradeItems}
                value={gradePickerValue}
                placeholder="Grade"
                onValueChange={(val) => {
                  setGradePickerValue(val);
                }}
              />
            )}
            <Button
              text="Submit"
              status="primary"
              onPress={async () => {
                //console.log(user.id + name + username + rolePickerValue + gradePickerValue)
                if (
                  name != "Full Name" &&
                  username != "Username" &&
                  school != "School" &&
                  rolePickerValue != null
                ) {
                  if (
                    rolePickerValue == "student" &&
                    gradePickerValue != null
                  ) {
                    setUser(null);
                    setCreatingAccount(true);
                    var response = await createUser(
                      user.id,
                      name,
                      username,
                      rolePickerValue,
                      school,
                      Number(gradePickerValue),
                      user.picture
                    );
                    setUser(response);
                    saveUserInfo("userData", JSON.stringify(user));
                    setHasAccount(true);
                    setCreatingAccount(false);
                    changeScreen();
                  } else if (rolePickerValue != "student") {
                    setUser(null);
                    setCreatingAccount(true);
                    var response = await createUser(
                      user.id,
                      name,
                      username,
                      rolePickerValue,
                      school,
                      0,
                      user.picture
                    );
                    setUser(response);
                    saveUserInfo("userData", JSON.stringify(user));
                    setHasAccount(true);
                    setCreatingAccount(false);
                    changeScreen();
                  } else {
                    console.log("fill in all feilds");
                    //display error
                  }
                } else {
                  console.log("fill in all feilds");
                  //display error
                }
              }}
            />
          </View>
        );
      } else {
        return <View></View>;
      }
    };

    const SignInPage = () => {
      const [fadeAnimText1] = useState(new Animated.Value(0));
      const [fadeAnimText2] = useState(new Animated.Value(0));
      const [fadeAnimImage] = useState(new Animated.Value(0));
      const [fadeAnimButton] = useState(new Animated.Value(0));

      useEffect(() => {
        Animated.sequence([
          Animated.parallel([
            Animated.timing(fadeAnimText1, fadeProperties),
            Animated.timing(fadeAnimImage, fadeProperties),
          ]),
          Animated.timing(fadeAnimText2, fadeProperties),
          Animated.parallel([
            Animated.timing(fadeAnimImage, fadeProperties),
            Animated.timing(fadeAnimButton, fadeProperties),
          ]),
        ]).start();
      }, []);
      return (
        <>
          <Animated.Image
            source={require("../../logo.png")}
            style={{ width: 150, height: 150, opacity: fadeAnimImage }}
          />
          <Animated.Text
            style={{ ...titleText, ...{ opacity: fadeAnimText1 } }}
          >
            ShareMonkey
          </Animated.Text>
          <Animated.Text
            style={{ ...titleText, ...{ opacity: fadeAnimText2 } }}
          >
            {" "}
            Please Log In
          </Animated.Text>
          <Animated.View style={{ opacity: fadeAnimButton }}>
            <TouchableOpacity
              disabled={!request}
              onPress={() => {
                promptAsync();
              }}
            >
              <Image
                source={require("../../btn.png")}
                style={{ width: 300, height: 40 }}
              />
            </TouchableOpacity>
            <Button
              text="Skip Log In"
              onPress={() => {
                setloggedIn(true);
              }}
              style={{ marginTop: 10 }}
            />
          </Animated.View>
        </>
      );
    };

    const SignInManager = () => {
      return (
        <Animated.View style={animatedViewStyle}>
          {!accessToken && <SignInPage />}
          {accessToken && <LoggingIn />}
          {!hasAccount && <CreateAccount />}
          {creatingAccount && <CreatingNewAccount />}
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
        <MainStack.Screen
          name="Log In to ShareMonkey"
          component={SignInManager}
        />
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
