import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from './Button';

const AskForLoginModal = ({
  visible,
  onCLickLogin,
  onClickRegister,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity style={{position: 'absolute', top: 5, right: 16}}
           onPress={() => onClose()}
          >
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Image
            source={require('../assets/images/pngegg.png')}
            style={styles.avatar}
          />
          <Text style={styles.modalText}>
            PLease Create your Account{' '}
            <Text style={{color: '#8a8a8a'}}>Or Login To continue</Text>
          </Text>
          <View style={styles.viewBtn}>
            <View style={{width: '45%'}}>
              <Button
                title={'LogIn'}
                bg={'#6a7ef2'}
                color={'#fff'}
                onClick={() => onCLickLogin()}
              />
            </View>
            <View style={{width: '45%'}}>
              <Button
                title={'Register'}
                bg={'#e2e0f5'}
                color={'#6067f9'}
                onClick={() => onClickRegister()}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AskForLoginModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#00000067',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    height: "auto",
    paddingBottom:20
  },
  modalText: {
    fontSize: 18,
    color: '#565454',
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  viewBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },
});
