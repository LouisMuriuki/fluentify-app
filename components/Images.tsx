import {
    StyleSheet,
    Image,
    View,
    ImageSourcePropType,
    ImageRequireSource,
  } from "react-native";
  import React, { useContext } from "react";
//   import theme from "../theme/theme";
//   import { ThemeContext } from "../context/ThemeContext";
  interface Props {
    image: ImageSourcePropType | ImageRequireSource;
    width: number;
    height: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
  }
  
  const Images = ({
    image,
    width,
    height,
    borderTopLeftRadius,
    borderTopRightRadius,
  }: Props) => {
    // const { darkmode, setDarkMode } = useContext(ThemeContext);
    const isRemote =
      typeof image === "object" &&
      "uri" in image &&
      image.uri?.startsWith("http");
    const imageSource = isRemote ? image : (image as ImageRequireSource);
    return (
      <View
        style={[
          styles.avatarcontainer,
          {
            // borderColor:
            //   width < 100
            //     ? darkmode
            //       ? theme.dark.imagebordercolor
            //       : theme.light.imagebordercolor
            //     : "#fff",
            width: width + 4,
            height: height + 4,
            borderRadius: 50,
            borderTopLeftRadius: borderTopLeftRadius,
            borderTopRightRadius: borderTopRightRadius,
          },
        ]}
      >
        <Image
          style={[styles.tinyLogo, { height, width }]}
          source={imageSource}
        />
      </View>
    );
  };
  
  export default Images;
  
  const styles = StyleSheet.create({
    tinyLogo: {
      borderRadius: 50,
    },
    avatarcontainer: {
      borderRadius: 50,
      padding: 1,
      borderWidth: 1,
    },
  });
  