import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Items from '../screens/Items';

const Stack = createNativeStackNavigator();

const ItemsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Items" component={Items} />
    </Stack.Navigator>
  );
};

export default ItemsStack;
