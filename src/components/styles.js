import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export const titleText = {
    fontSize: 35, 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: "bold"
};

export const animatedViewStyle = {
    flexDirection: 'column',
    height: 745,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
};

export const fadeProperties = {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }