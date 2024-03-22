import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
