import {
  StyleSheet,
} from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF'
  },

  headerModal: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff'
  },

  headerCorner: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgCorner: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  headerMain: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#FF7E50',
    fontSize: 16,
    textAlign: 'center'
  },

  itemWrapper: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15
  },
  itemText: {
    marginLeft: 10,
    color: '#FF7E50',
    fontSize: 12,
  },
  dividerItem: {
    height: 1,
    marginHorizontal: 15,
    backgroundColor: '#DDDDDD'
  },

  blankPage: {
    height: 300,
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF7E50',
  }
 
});