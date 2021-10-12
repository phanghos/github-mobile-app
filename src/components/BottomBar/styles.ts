import { StyleSheet } from 'react-native';
import { tabWidth } from 'consts/navigationConsts';

export default StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#e8e8e8',
  },
  animatedContainer: {
    width: tabWidth,
    height: 6,
    backgroundColor: '#f81',
    borderRadius: tabWidth / 3,
  },
});
