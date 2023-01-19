import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "react-native-rapi-ui";

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://6a6de79a5b574e629aac6d84769bcd23@o4504528218947584.ingest.sentry.io/4504528219996160',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});


export default function App() {
  return (
    
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
