import {
    ColorValue,
    Pressable,
    Text,
    View,
    ActivityIndicator,
  } from "react-native";
  import React from "react";
  import { AntDesign, Ionicons } from "@expo/vector-icons";
  import { Fontisto } from "@expo/vector-icons";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  interface Props {
    disabled?: boolean;
    onPress: () => void;
    text?: string;
    rippleColor?: ColorValue;
    backgroundColor?: ColorValue;
    height?: number;
    elevation?: number;
    margin?: number | string;
    fontSize?: number;
    fontWeight?: number | string;
    color?: ColorValue | string;
    fontFamily?: string;
    icon?: string;
    width?: number | string;
    paddingHorizontal?: number;
    borderRadius?: number;
    borderColor?: ColorValue;
    borderWidth?: number;
    justifyContent?: string;
    alignItems?: string;
    flexDirection?: string;
    iconcolor?: ColorValue;
    iconsize?: number;
    marginHorizontal?: number | string;
    marginBottom?: number | string;
    marginTop?: number | string;
    loading?: boolean;
  }
  
  const Button = ({
    disabled,
    onPress,
    text,
    rippleColor,
    backgroundColor,
    height,
    elevation,
    margin,
    fontSize,
    fontWeight,
    color,
    fontFamily,
    icon,
    width,
    paddingHorizontal,
    borderRadius,
    borderColor,
    borderWidth,
    justifyContent,
    alignItems,
    flexDirection,
    iconcolor,
    iconsize,
    marginHorizontal,
    marginBottom,
    marginTop,
    loading,
  }: Props) => {
    return (
      <View
        style={{
          borderRadius: borderRadius,
          justifyContent: justifyContent,
          elevation: elevation,
          margin: margin,
          marginBottom: marginBottom,
          marginHorizontal: marginHorizontal,
          marginTop: marginTop,
          borderColor: borderColor,
          flexDirection: flexDirection,
          borderWidth: borderWidth,
          alignItems: alignItems,
          backgroundColor: backgroundColor,
        }}
      >
        <Pressable
          disabled={disabled}
          android_ripple={{ color: rippleColor, borderless: true }}
          onPress={onPress}
          style={{
            backgroundColor: backgroundColor,
            height: height,
            width: width,
            borderRadius: borderRadius,
            paddingHorizontal: paddingHorizontal,
            borderColor: backgroundColor,
            justifyContent: justifyContent,
            alignItems: alignItems,
            flexDirection: flexDirection,
          }}
        >
          {loading && <ActivityIndicator />}
          <Text
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              color: color,
              fontFamily: fontFamily,
              justifyContent: justifyContent,
              alignItems: alignItems,
            }}
          >
            {text}
          </Text>
          {icon === "send-circle" && (
            <MaterialCommunityIcons
              name={icon}
              size={iconsize}
              style={{
                marginLeft: 5,
                marginTop: 4,
              }}
              color={iconcolor}
            />
          )}
          {icon === "check" && (
            <AntDesign
              name={icon}
              style={{
                position: "absolute",
                marginBottom: 18,
              }}
              size={24}
              color="white"
            />
          )}
          {icon === "add-sharp" && (
            <Ionicons name="add-sharp" size={24} color={iconcolor} />
          )}
        </Pressable>
      </View>
    );
  };
  export default Button;
  