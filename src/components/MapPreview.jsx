import { Image, StyleSheet, Text, View } from 'react-native';
import { googleAPI } from '../firebase/googleAPI';

const MapPreview = ({ location }) => {
  console.log(location.latitude);
  console.log(location.longitude);
  const { latitude, longitude } = location;
  const size = '600x300';
  const zoom = 13;
  const markers = [
    `color:blue|label:S|${latitude},${longitude}`,
    'color:green|label:G|40.711614,-74.012318',
    'color:red|label:C|40.718217,-73.998284',
  ].join('&markers=');

  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=${markers}&key=${googleAPI.mapStatic}`;

  return (
    <View style={styles.mapPreview}>
      <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: 300,
    height: 300,
  },
});
