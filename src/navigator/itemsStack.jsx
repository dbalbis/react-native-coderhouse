import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import ItemDetail from '../Screens/ItemDetail';

const Stack = createNativeStackNavigator();

const ItemsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ItemDetail" component={ItemDetail} />
    </Stack.Navigator>
  );
};

export default ItemsStack;
