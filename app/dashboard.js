/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';

import { Button, Icon } from 'react-native-elements';


//import Icon from 'react-native-vector-icons/Ionicons';

import Ws from './ws';

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.ws = new Ws();

    this.ouvrir = this.ouvrir.bind(this);
    this.fermer = this.fermer.bind(this);

    this.refresh = this.refresh.bind(this);
    this.loadInfo = this.loadInfo.bind(this);

    this.state = {info: {}, isRefreshing: true};
  }

  componentDidMount() {
    this.loadInfo();
  }

  render() {

    let info = this.state.info;

    let date = '';
    let luminosite = '';
    let ouvert = '';
    let ferme = '';
    let voltage = '';
    let intensity = '';

    if(typeof(info['last_update']) != 'undefined') {
      let dateObj = new Date(info['last_update'] * 1000);
      date = dateObj.toLocaleString();
    }
    if(typeof(info['ds[luminosite].last_ds']) != 'undefined') {
      luminosite = info['ds[luminosite].last_ds'] + ' lux';
    }
    if(typeof(info['ds[ouvert].last_ds']) != 'undefined') {
      ouvert = info['ds[ouvert].last_ds'] == '1' ? 'Oui' : 'Non';
    }
    if(typeof(info['ds[ferme].last_ds']) != 'undefined') {
      ferme = info['ds[ferme].last_ds'] == '1' ? 'Oui' : 'Non';
    }
    if(typeof(info['ds[voltage].last_ds']) != 'undefined') {
      voltage = info['ds[voltage].last_ds'] + ' V';
    }
    if(typeof(info['ds[intensity].last_ds']) != 'undefined') {
      intensity = info['ds[intensity].last_ds'];
    }

    return (
      <View style={styles.main}>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.refresh}
            tintColor="#ff0000"
            title="Chargement..."
          />
        }>
        <View style={styles.info}>
          <Text style={styles.infolegend}>{date}</Text>
          <View style={styles.inforow}>
            <Icon reverse raised color={StyleSheet.flatten(styles.icon).backgroundColor} reverseColor={StyleSheet.flatten(styles.icon).color} name="wb-sunny" onPress={this.props.detailLuminosite}/>
            <View style={styles.infotext}>
              <Text style={styles.infotitle}>Luminosité</Text><Text style={styles.infovalue}>{luminosite}</Text>
            </View>
          </View>
          <View style={styles.inforow}>
            <Icon reverse raised color={StyleSheet.flatten(styles.icon).backgroundColor} reverseColor={StyleSheet.flatten(styles.icon).color} name="file-upload" onPress={this.props.detailOuvert}/>
            <View style={styles.infotext}>
              <Text style={styles.infotitle}>Ouvert</Text><Text style={styles.infovalue}>{ouvert}</Text>
            </View>
          </View>
          <View style={styles.inforow}>
            <Icon reverse raised color={StyleSheet.flatten(styles.icon).backgroundColor} reverseColor={StyleSheet.flatten(styles.icon).color} name="file-download" onPress={this.props.detailFerme}/>
            <View style={styles.infotext}>
              <Text style={styles.infotitle}>Fermé</Text><Text style={styles.infovalue}>{ferme}</Text>
            </View>
          </View>
          <View style={styles.inforow}>
            <Icon reverse raised color={StyleSheet.flatten(styles.icon).backgroundColor} reverseColor={StyleSheet.flatten(styles.icon).color} name="battery-charging-full" onPress={this.props.detailVoltage}/>
            <View style={styles.infotext}>
              <Text style={styles.infotitle}>Charge</Text><Text style={styles.infovalue}>{voltage}</Text>
            </View>
          </View>
          <View style={styles.inforow}>
            <Icon reverse raised color={StyleSheet.flatten(styles.icon).backgroundColor} reverseColor={StyleSheet.flatten(styles.icon).color} name="wifi" onPress={this.props.detailIntensity}/>
            <View style={styles.infotext}>
              <Text style={styles.infotitle}>Réception</Text><Text style={styles.infovalue}>{intensity}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button raised icon={{name:'file-upload', color:StyleSheet.flatten(styles.icon).color}} backgroundColor={StyleSheet.flatten(styles.icon).backgroundColor} color={StyleSheet.flatten(styles.icon).color} title="Ouvrir" onPress={this.ouvrir} disabled={this.state.disabled}/>
          </View>
          <View style={styles.button}>
            <Button raised icon={{name:'file-download', color:StyleSheet.flatten(styles.icon).color}} backgroundColor={StyleSheet.flatten(styles.icon).backgroundColor} color={StyleSheet.flatten(styles.icon).color} title="Fermer" onPress={this.fermer} disabled={this.state.disabled}/>
          </View>
        </View>
      </ScrollView>
      </View>


    );
  };

  refresh() {
    if(this.state.isRefreshing) return;
    this.setState({'isRefreshing' : true});

    this.loadInfo();
  };

  loadInfo() {

    var self = this;
    this.ws.getInfo()
      .then((info) => self.setState({info: info, isRefreshing: false}))
      .catch((error) => alert(error));
  };

  ouvrir() {
    this.setState({disabled: true});
    this.ws.ouvrir(this.state)
      .then((data) => this.setState({disabled: false}))
      .catch((error) => alert(error));
  };

  fermer() {
    this.setState({disabled: true});
    this.ws.fermer(this.state)
      .then((data) => this.setState({disabled: false}))
      .catch((error) => alert(error));
  };

}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#004D40',
  },
  container: {
//    flex: 1,
    flexDirection: 'column',
//    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  info: {
//    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infolegend: {
    margin: 5,
    color: '#FFFFFF8A',
  },
  inforow: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF8A',
  },
  infotext: {
    flex:1,
    padding: 5,
    flexDirection: 'column',
  },
  icon: {
    backgroundColor: '#26A69A',
    color: '#000000DE',
  },
  infotitle: {
    flex: 1,
    fontWeight: 'bold',
    color: '#FFFFFFB3',
  },
  infovalue: {
    flex: 1,
    color: '#FFFFFFB3',
  },
  infobtn: {
//    width: 20,
  },
  buttons: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    flex:1,
  }
});