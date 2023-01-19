import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://d831b6c92dfc40aab8adaa66e05f10be@o4504528218947584.ingest.sentry.io/4504528497016832',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production

});


Sentry.Native.captureException(Error("My first Sentry error!"));

export default function App() {
  return (
    
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
