/**
 * @format
 */

import React from "react";
import ReactTestRenderer from "react-test-renderer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { hydrateTokens } from "../src/services/api";

jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }: any) => children,
}));

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaProvider: ({ children }: any) => children,
}));

jest.mock("react-native-screens", () => ({
  enableScreens: jest.fn(),
}));

jest.mock("../src/navigation/AppNavigator", () => ({
  AppNavigator: ({ initialRouteName }: any) => {
    const React = require("react");
    const ReactNative = require("react-native");
    return React.createElement(
      ReactNative.Text,
      null,
      `route:${initialRouteName}`
    );
  },
}));

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

jest.mock("../src/services/api", () => ({
  hydrateTokens: jest.fn(),
}));

import App from "../App";

const renderApp = async (options: {
  accessToken?: string;
  onboardingDone?: string | null;
}) => {
  (hydrateTokens as jest.Mock).mockResolvedValue({
    accessToken: options.accessToken || "",
  });
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
    options.onboardingDone ?? "true"
  );

  let tree: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(<App />);
  });

  return tree!;
};

beforeEach(() => {
  jest.clearAllMocks();
});

test("renderiza onboarding cuando aun no se ha completado", async () => {
  const tree = await renderApp({
    accessToken: "token-activo",
    onboardingDone: "false",
  });

  expect(tree.root.findByType(Text).props.children).toBe("route:Onboarding");
});

test("renderiza home cuando existe sesion activa y onboarding completo", async () => {
  const tree = await renderApp({
    accessToken: "token-activo",
    onboardingDone: "true",
  });

  expect(tree.root.findByType(Text).props.children).toBe("route:Home");
});

test("renderiza auth cuando no hay sesion y onboarding ya fue completado", async () => {
  const tree = await renderApp({
    accessToken: "",
    onboardingDone: "true",
  });

  expect(tree.root.findByType(Text).props.children).toBe("route:Auth");
  expect(tree.toJSON()).toBeTruthy();
});
