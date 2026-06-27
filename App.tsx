import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { SvgXml } from "react-native-svg";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "./src/types/index";
import HomeScreen from "./src/screens/HomeScreen";
import PostDetailsScreen from "./src/screens/PostDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function PostDetailsHeader({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.customHeader, { paddingTop: insets.top }]}>
      <View style={styles.headerLeftRow}>
        <HeaderBackButton
          accessibilityLabel="Back"
          onPress={onBack}
          tintColor="#6D31EA"
          style={styles.backButton}
        />
        <Text style={styles.postDetailsTitleText}>Post Details</Text>
      </View>
    </View>
  );
}

const logoXml = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="600.000000pt" height="600.000000pt" viewBox="0 0 600.000000 600.000000"
 preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,600.000000) scale(0.100000,-0.100000)"
fill="#6D31EA" stroke="none">
<path d="M5283 4398 c-23 -18 -84 -68 -136 -110 -79 -64 -310 -228 -322 -228
-2 0 -36 -20 -77 -44 -114 -69 -380 -198 -498 -241 -25 -9 -54 -21 -65 -26
-11 -4 -49 -18 -85 -29 -36 -12 -74 -26 -85 -31 -26 -12 -212 -63 -345 -94
-58 -14 -114 -27 -125 -30 -11 -3 -87 -17 -170 -30 -164 -28 -165 -28 -180
-37 -5 -3 -30 -9 -55 -13 -157 -24 -399 -190 -678 -465 -125 -123 -117 -119
-141 -73 -11 21 -28 54 -37 73 -42 89 -240 295 -325 339 -24 13 -63 33 -86 46
-23 12 -52 26 -65 30 -13 4 -25 8 -28 9 -45 20 -73 28 -133 37 -40 6 -79 13
-87 16 -24 8 -199 3 -275 -8 -65 -10 -118 -22 -155 -36 -8 -4 -17 -7 -20 -8
-31 -10 -137 -61 -180 -86 -72 -43 -187 -148 -251 -229 -51 -64 -123 -196
-143 -260 -9 -30 -21 -63 -26 -72 -21 -37 -32 -168 -27 -308 4 -128 8 -155 35
-235 44 -128 92 -217 168 -313 131 -165 311 -287 490 -332 43 -11 91 -20 106
-20 15 0 30 -4 33 -10 8 -12 239 -13 263 -1 9 5 46 14 82 21 85 15 229 73 305
123 33 22 101 80 151 129 l92 89 52 -28 c28 -15 77 -42 108 -60 31 -17 64 -35
72 -39 8 -4 42 -19 75 -35 92 -42 264 -105 325 -118 30 -7 64 -16 75 -21 24
-11 156 -36 275 -51 111 -15 443 -15 545 0 339 48 490 103 590 214 61 67 79
119 73 206 -5 73 -39 127 -100 161 l-43 24 30 7 c17 3 72 12 123 19 51 6 105
18 120 26 15 8 34 14 43 14 27 0 158 59 243 109 88 52 209 171 233 230 8 20
22 50 30 68 27 57 21 132 -16 207 -18 36 -37 66 -42 66 -6 0 -25 11 -44 25
-19 15 -58 31 -94 37 -34 6 -61 14 -61 17 0 3 27 18 59 34 33 15 90 47 127 72
36 25 71 45 76 45 13 0 268 256 268 269 0 5 17 37 39 70 66 102 126 285 135
411 6 82 -9 266 -22 284 -5 6 -17 36 -26 66 -10 30 -30 78 -45 105 -25 46 -31
50 -67 53 -31 2 -48 -5 -81 -30z"/>
</g>
</svg>`;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: "#6D31EA",
          headerStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <SvgXml xml={logoXml} width={40} height={40} />
                <Text style={styles.headerTitleText}>Social Feed</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetailsScreen}
          options={({ navigation }) => ({
            header: () => (
              <PostDetailsHeader onBack={() => navigation.goBack()} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  customHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 0,
    paddingBottom: 12,
  },
  headerLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 0,
    marginLeft: 0,
  },
  headerTitleText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  postDetailsTitleText: {
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
