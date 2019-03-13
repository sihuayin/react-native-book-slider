/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BookBox from './slider/BookBox'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    const images = [
      'https://deulos.github.io/vue-flux/slides/1.jpg',
      'https://deulos.github.io/vue-flux/slides/2.jpg',
      'https://deulos.github.io/vue-flux/slides/3.jpg',
      'https://deulos.github.io/vue-flux/slides/4.jpg',
      'https://deulos.github.io/vue-flux/slides/5.jpg'
    ]

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.refs.slider.goNext(3)
        }}>
          <Text>
            下一张
          </Text>
        </TouchableOpacity>
        <BookBox ref="slider" style={{width: 600, height: 400}} images={images} width={600}  height={400}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
