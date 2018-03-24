/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper';

import Ws from './ws';

export default class Graph extends Component {

  constructor(props) {
    super(props);
    this.ws = new Ws();

    this.loadGraphs = this.loadGraphs.bind(this);
    this.loadGraph = this.loadGraph.bind(this);

    this.state = {
      width: 0, height: 0,
      daily: {img: {uri: ''}},
      weekly: {img: {uri: ''}},
      monthly: {img: {uri: ''}},
      yearly: {img: {uri: ''}},
    };
  }

  render() {
    return(
      <View onLayout={this.loadGraphs} style={styles.container}>
      <Swiper width={this.state.width} height={this.state.height} showsPagination={false}>
        <View style={styles.container}>
        {this.state.daily.img.uri != '' &&
          <Image source={this.state.daily.img} style={{width: this.state.width, height: this.state.height}}/>
        }
        </View>
        <View style={styles.container}>
        {this.state.weekly.img.uri != '' &&
          <Image source={this.state.weekly.img} style={{width: this.state.width, height: this.state.height}}/>
        }
        </View>
        <View style={styles.container}>
        {this.state.monthly.img.uri != '' &&
          <Image source={this.state.monthly.img} style={{width: this.state.width, height: this.state.height}}/>
        }
        </View>
        <View style={styles.container}>
        {this.state.yearly.img.uri != '' &&
          <Image source={this.state.yearly.img} style={{width: this.state.width, height: this.state.height}}/>
        }
        </View>
      </Swiper>
      </View>
    );
  };

  loadGraphs(event) {
    var {x, y, width, height} = event.nativeEvent.layout;
    this.setState({width:width, height:height});

    this.loadGraph(event, 'daily');
    this.loadGraph(event, 'weekly');
    this.loadGraph(event, 'monthly');
    this.loadGraph(event, 'yearly');
  }

  loadGraph(event, period) {
    var {x, y, width, height} = event.nativeEvent.layout;
    if(width > 10 && height > 10 && (width != this.state.width || height != this.state.height)) {
      this.setState({img: {uri: ''}});
      this.ws.getGraph(this.props.probe, period, width, height)
        .then((data) => { var state = {}; state[period] = {img: {uri: data}}; this.setState(state)})
        .catch((error) => alert(error));
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#004D40',
  },
});