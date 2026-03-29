import React, { useContext } from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { ThemeContext } from '../context/ThemeContext'; 
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import SummaryScreen from '../screens/SummaryScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colors } = useContext(ThemeContext); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Summary') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.text, 
        tabBarInactiveTintColor: colors.subtext, 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card, 
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 100, 
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Tab.Screen 
        name="Add" 
        component={AddScreen} 
        options={{ title: 'Add Data' }} 
      />
      <Tab.Screen 
        name="Summary" 
        component={SummaryScreen} 
        options={{ title: 'Statistik' }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;