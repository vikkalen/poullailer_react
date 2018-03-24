/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


import Dashboard from './app/dashboard';
import Graph from './app/graph';
import Config from './app/config';

export default class Poulailler extends Component {

  constructor(props) {
    super(props);

    //this.state = {img: {uri: ''}, width: 0};
  }

  componentDidMount() {
//    this.loadInfo();
  }

  render() {

    const routes = [
      {title: 'Tableau de bord', key: 'dashboard'},
      {title: 'Détail', key: 'luminosite'},
      {title: 'Détail', key: 'ouvert'},
      {title: 'Détail', key: 'ferme'},
      {title: 'Détail', key: 'voltage'},
      {title: 'Détail', key: 'intensity'},
      {title: 'Configuration', key: 'configuration'},
    ];

    return (
      <Navigator
        initialRoute={routes[0]}
       renderScene={(route, navigator) => {
          if (route.key === 'dashboard') {
            return <Dashboard
              detailLuminosite={() => navigator.push(routes[1])}
              detailOuvert={() => navigator.push(routes[2])}
              detailFerme={() => navigator.push(routes[3])}
              detailVoltage={() => navigator.push(routes[4])}
              detailIntensity={() => navigator.push(routes[5])}
            />
          }
          else if (route.key === 'luminosite') {
            return <Graph probe="luminosite"/>
          }
          else if (route.key === 'ouvert') {
            return <Graph probe="ouvert"/>
          }
          else if (route.key === 'ferme') {
            return <Graph probe="ferme"/>
          }
          else if (route.key === 'voltage') {
            return <Graph probe="voltage"/>
          }
          else if (route.key === 'intensity') {
            return <Graph probe="intensity"/>
          }
          else if (route.key === 'configuration') {
            return <Config/>
          }
        }}
        configureScene={(route, routeStack) => {
          if(route.key == "configuration") return Navigator.SceneConfigs.VerticalUpSwipeJump;
          else return Navigator.SceneConfigs.PushFromRight;
        }}
        navigationBar={
          <Navigator.NavigationBar
             routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                {
                  if (index === 0) {
                    return null;
                  } else {
                    return (
                      <TouchableHighlight onPress={() => navigator.pop()}>
                        <Icon name="md-arrow-back" style={styles.toolbarIcon}/>
                      </TouchableHighlight>
                    );
                  }
                },
               RightButton: (route, navigator, index, navState) =>
                 {
                  if (index === 0) {
                    return (
                      <TouchableHighlight onPress={() => navigator.push(routes[6])}>
                        <Icon name="md-settings" style={styles.toolbarIcon}/>
                      </TouchableHighlight>
                    );
                  } else {
                    return null;
                  }
                },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={styles.toolbarTitle}>Poulailler</Text>); },
             }}
             style={styles.toolbar}
           />
        }
        sceneStyle={styles.scene}
      />
    );
  };
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#26A69A',
    height: 48,
    elevation:4,
  },
  toolbarIcon: {
    fontSize: 24,
    color: '#000000DE',
    margin: 6,
  },
  toolbarTitle: {
    paddingLeft: 36,
    marginTop: 12,
    color: '#000000DE',
    fontSize: 24
  },
  scene: {
    marginTop: 48,
    backgroundColor: '#004D40',
  },  
});

AppRegistry.registerComponent('poulailler', () => Poulailler);
