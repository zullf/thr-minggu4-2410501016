import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransactionProvider } from "./context/TransactionContext";
import { ThemeProvider } from "./context/ThemeContext";
import BottomTabNavigator from "./navigation/BottomTabNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </TransactionProvider>
    </ThemeProvider>
  );
}
