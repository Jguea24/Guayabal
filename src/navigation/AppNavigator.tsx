import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingNavigator } from "./OnboardingNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { HomeScreen } from "../presentation/screens/HomeScreen";
import { ProductDetailScreen } from "../presentation/screens/ProductDetailScreen";
import { Product } from "../model/Product";
import { ProfileScreen } from "../presentation/screens/ProfileScreen";

/* 👇 Tipado del stack */

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Home: undefined;
  ProductDetail: { product: Product };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type AppNavigatorProps = {
  initialRouteName?: keyof RootStackParamList;
};

export function AppNavigator({
  initialRouteName = "Onboarding",
}: AppNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingNavigator}
      />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
}
