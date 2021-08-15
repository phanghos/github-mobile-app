import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  line: {
    position: 'absolute',
    top: 0,
    width: 60,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#e8e8e8',
    alignSelf: 'center',
    margin: 8,
    zIndex: 1,
  },
});
