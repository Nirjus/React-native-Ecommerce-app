import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ProductItem from '../../common/ProductItem';
import SquareItem from '../../common/SquareItem';

const Search = () => {
  const navigation = useNavigation();
  const {data} = useSelector(state => state.product);
  const [search, setSearch] = React.useState('');
  const [searchList, setSearchList] = React.useState([]);
  const [categoryProducts, setCategoryProducts] = React.useState([]);
  const filterData = txt => {
    let newData = data.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchList(newData);
  };
  React.useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        json.map(item => {
          item.qty = 1;
        });
        const categoryArray = new Map();
        json.map(item => {
          categoryArray.set(item.category);
        });
        const arr = [];
        for (const key of categoryArray.keys()) {
          const itemArr = [];
          json.map(item => {
            if (item.category === key) {
              itemArr.push(item);
            }
          });
          arr.push({
            key: key,
            item: itemArr,
          });
        }
        setCategoryProducts(arr);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../assets/icons/menu.png')}
        rightIcon={require('../../assets/icons/shopping-cart.png')}
        title={'Category'}
        isCart={true}
        onClickLeftIcon={() => navigation.openDrawer()}
        onClickRightIcon={() => navigation.navigate('Cart')}
      />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Image
            source={require('../../assets/icons/search.png')}
            width={500}
            height={500}
            style={styles.icon}
          />
          <TextInput
            placeholder="Search Items.."
            placeholderTextColor={'#7e7d7d'}
            value={search}
            onChangeText={txt => {
              setSearch(txt), filterData(txt);
            }}
            style={styles.searchInput}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch(''), setSearchList([]);
            }}>
            <Image
              source={require('../../assets/icons/close.png')}
              style={{height: 28, width: 28}}
            />
          </TouchableOpacity>
        )}
      </View>
      {searchList && searchList.length !== 0 ? (
        <FlatList
          data={searchList}
          renderItem={({item, index}) => {
            return <ProductItem item={item} index={index} />;
          }}
        />
      ) : (
        <FlatList
          data={categoryProducts}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <Text style={styles.listText}>{item.key}</Text>
                <FlatList
                  data={item.item}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, i}) => {
                    return <SquareItem item={item} index={i} isCart={false} />;
                  }}
                />
              </View>
            );
          }}
        />
      )}
      {/* <View style={{marginVertical:35}}></View> */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    width: '80%',
    fontSize: 18,
  },
  listText: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 20,
    color: '#3d3d3d',
    textTransform: 'capitalize',
    marginVertical: 10,
  },
});
