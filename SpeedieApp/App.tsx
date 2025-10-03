import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import WarningLightsScreen from './src/screens/WarningLightsScreen';
import WarningLightDetailScreen from './src/screens/WarningLightDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f8f9fa' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Speedie',
          }}
        />
        <Stack.Screen 
          name="WarningLights" 
          component={WarningLightsScreen}
          options={{
            title: 'Warning Lights',
          }}
        />
        <Stack.Screen 
          name="WarningLightDetail" 
          component={WarningLightDetailScreen}
          options={{
            title: 'Warning Light Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
