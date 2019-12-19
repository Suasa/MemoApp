import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import CircleButton from '../elements/CircleButton';
import firebase from 'firebase';

// const newDate = firebse.firestore.Timestamp.now();

class MemoEditScreen extends React.Component {
  state = {
    body: '',
    key: '',
  }
  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      body: params.memo.body,
      key: params.memo.key,
    });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    const newDate = firebase.firestore.Timestamp.now();
    const db = firebase.firestore();
    console.log(this.state);
    db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key)
      .update({
        body: this.state.body,
        created_on: newDate,
      })
      .then(() => {
        console.log('success');
        const { navigation } = this.props;
        navigation.state.params.returnMemo({
          body: this.state.body,
          key: this.state.key,
          created_on: newDate,
        });
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoEditInput}
          multiline
          value={this.state.body}
          onChangeText={(text) => { this.setState({ body:  text }); }}
        />
        <CircleButton name="check" onPress={this.handlePress.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoEditScreen;
