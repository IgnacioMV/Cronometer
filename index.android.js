/**
 * Cronometer
 * Ignacio Martín Velasco TFG
 * 2016
 * https://github.com/IgnacioMV/Cronometer
 @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

const timer = require('react-native-timer');

class Crono extends Component {

  constructor(props) {
    super(props);
    this.state = {
      play: false,
      time: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    }
  }

  componentDidMount() {
    setTimeout(this.measureCronoImage.bind(this));
  }

  measureCronoImage() {
    this.refs.cronoImage.measureInWindow((a, b, width, height) => {
      this.setState({
        x: a,
        y: b,
        w: width,
        h: height
    })});
  }

  onSubtractPressed() {
    var time = this.state.time;
    (time > 0) ? this.setState({time: time-1}) : null;
  }

  onAddPressed() {
    this.setState({time: this.state.time+1});
  }

  onNextOpButtonPressed() {
    if(this.state.time <= 0) {
      return;
    }
    var play = !this.state.play;
    this.setState({play: play});
    (play == true) ? this.startCrono() : this.stopCrono();
  }

  startCrono() {
    timer.setInterval('crono', () => {
      this.setState({time: this.state.time-1});
      if(this.state.time <= 0) {
        this.setState({time: 0, play: false});
        Alert.alert("DING DING DING");
        setTimeout(this.stopCrono.bind(this));
      }
    }, 1000);
  }

  stopCrono() {
    timer.clearInterval('crono');
  }

  render() {
    //Preparation and container
    var time = (this.state.time < 10) ? "0"+this.state.time+"s" : this.state.time+"s";
    return (

      <View style={styles.container}>

  {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Temporizador</Text>
        </View>

  {/* Add and subtract buttons and seconds remaining */}
        <View style={styles.bar}>
          <TouchableOpacity style={styles.barButton}
            onPress={this.onSubtractPressed.bind(this)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.time}> {time} </Text>
          <TouchableOpacity style={styles.barButton}
            onPress={this.onAddPressed.bind(this)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

  {/* Clock sphere */}
        <View style={styles.cronoContainer}>
          <Image
            ref="cronoImage"
            style={styles.cronoImage}
            source={require('./img/crono.png')}/>
        </View>

  {/* Clochand container */}
        <View style={{
          top: this.state.y+this.state.h/5,
          left: this.state.x+this.state.w/2-10,
          position: 'absolute',
          transform: [
             {rotate: (this.state.time*6)+'deg'}
          ]
        }}>

  {/* Clockhand */}
          <View style={{
            width: 20,
            height: this.state.h*3/5,
            borderWidth: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            borderColor: '#111111',
         }}
         />
         <View style={{
            width: 6,
            height: 20,
            top: 0,
            left: 7,
            backgroundColor: 'red',
            position: 'absolute'
         }}
         />

  {/* Start/stop button */}
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.nextOpButton}
            onPress={this.onNextOpButtonPressed.bind(this)}>
            <Image source={(this.state.play) ? require('./img/pause.png') : require('./img/play.png')}
              style={styles.nextOpButtonImage}
            />
          </TouchableOpacity>
        </View>

  {/* End container */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 25,
    textAlign: 'center'
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barButton: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 20,
    width: 20,
  },
  buttonText: {
    textAlign: 'center',
  },
  time: {
    fontSize: 20,
  },
  cronoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cronoImage: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextOpButton: {
    margin: 5,
  },
  nextOpButtonText: {
    fontSize: 20,
  },
  nextOpButtonImage: {
    width: 75,
    height: 75,
  }
});

AppRegistry.registerComponent('Crono', () => Crono);
