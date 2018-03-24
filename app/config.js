/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { FormLabel, FormInput, Button } from 'react-native-elements'

import Ws from './ws';

export default class Config extends Component {

  constructor(props) {
    super(props);
    this.ws = new Ws();

    this.loadConfig = this.loadConfig.bind(this);
    this.configurer = this.configurer.bind(this);

    this.state = {disabled: false};
  }

  componentDidMount() {
    this.loadConfig();
  }

  render() {
    var conf = JSON.stringify(this.state.config);
    return(
      <View style={styles.container}>
        <FormLabel>Fermeture</FormLabel>
        <FormInput keyboardType="numeric" value={this.state.lux_fermeture} onChangeText={(lux_fermeture) => this.setState({lux_fermeture})}/>
        <FormLabel>Ouverture</FormLabel>
        <FormInput keyboardType="numeric" value={this.state.lux_ouverture} onChangeText={(lux_ouverture) => this.setState({lux_ouverture})}/>
        <FormLabel>Durée max.</FormLabel>
        <FormInput keyboardType="numeric" value={this.state.tours} onChangeText={(tours) => this.setState({tours})}/>
        <FormLabel>Reéssayer</FormLabel>
        <FormInput keyboardType="numeric" value={this.state.retry} onChangeText={(retry) => this.setState({retry})}/>
        <FormLabel>Veille</FormLabel>
        <FormInput keyboardType="numeric" value={this.state.sleep} onChangeText={(sleep) => this.setState({sleep})}/>

        <Button raised icon={{name: 'check', color:StyleSheet.flatten(styles.icon).color}} backgroundColor={StyleSheet.flatten(styles.icon).backgroundColor} color={StyleSheet.flatten(styles.icon).color} title="Configurer" onPress={this.configurer} disabled={this.state.disabled}/>

      </View>
    );
  };

  loadConfig() {
    this.ws.getConfig()
      .then((data) => this.setState(data))
      .catch((error) => alert(error));
  }

  configurer() {
    this.setState({disabled: true});
    this.ws.configurer(this.state)
      .then((data) => this.setState({disabled: false}))
      .catch((error) => alert(error));
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#004D40',
  },
  icon: {
    backgroundColor: '#26A69A',
    color: '#000000DE',
  }, 
});