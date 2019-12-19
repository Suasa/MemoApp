import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, FlatList } from 'react-native';

const dateString = (date) => {
  const str = date.toDate().toISOString();
  return str.split('T')[0];
};

class MemoList extends React.Component {
  renderMemo({ item }) {
    console.log(item);
    return(
      <TouchableHighlight
        onPress={() => { this.props.navigation.navigate('MemoDetail', {memo: item}); }}
        >
        <View style={styles.memoListItem}>
          <Text style={styles.memoTitle}>{item.body.substring(0, 10)}</Text>
          <Text style={styles.memoDate}>{dateString(item.created_on)}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    console.log(this.props);
    // const list = [];
    // const array = [{body: "Body1", created_on: "created_on1"}, {body: "Body2", created_on: "created_on2"}]
    // memoList = this.props.memoList;
    // memoList.forEach((memo) => {
    //   list.push(this.renderMemo(memo));
    // });
    // if(memoList.length > 0) {
    //   memoList.forEach((memo) => {
    //     list.push(this.renderMemo(memo));
    //   });

// My effort
      // console.log(memoList);
      // list.push(memoList[0]);
      // console.log(array[0]);
      // console.log(this.renderMemo(array[0]));
      // list.push(this.renderMemo(array[0]));
      // console.log(memoList[0]);
      // console.log(this.renderMemo(memoList[0]));
      // list.push(this.renderMemo(memoList[0]));
    // } else {
    //   console.log('memoList is empty');
    // }
    return (
      <View style={styles.memoList}>
        <FlatList data={this.props.memoList} renderItem={this.renderMemo.bind(this)} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  memoList: {
    // backgroundColor: '#eee',
    width: '100%',
    flex: 1,
  },
  memoListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  memoTitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  memoDate: {
    fontSize: 12,
    color: '#a2a2a2',
  },
});
export default MemoList;
