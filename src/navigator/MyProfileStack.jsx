import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import LocationSelector from '../Screens/LocationSelector';
import MyProfile from '../Screens/MyProfile';
const Stack = createNativeStackNavigator();

const MyProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="My Profile"
      screenOptions={{ header: () => <Header title="My Profile" /> }}
    >
      <Stack.Screen name="My Profile" component={MyProfile} />
      <Stack.Screen name="Location Selector" component={LocationSelector} />
    </Stack.Navigator>
  );
};

export default MyProfileStack;
