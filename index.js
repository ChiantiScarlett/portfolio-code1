import App from "./src/app";
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { Text, TextInput } from "react-native";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  // 보안 이슈로 비활성화 했습니다.
  webClientId: "SOME_OAUTH_ID_KEY",
});

/** Ignore user-defined font scaling: */
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
