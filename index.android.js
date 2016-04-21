/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
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
      nextOp: 'Start',
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
      console.log(a);
      console.log(b);
      console.log(width);
      console.log(height);
      this.setState({ 
        x: a,
        y: b,
        w: width, 
        h: height
    })});
  }

  onSubtractPressed() {
    if (this.state.time == 0) {
      return;
    } else {
      this.setState({time: this.state.time-1});
    }
    this.refs.cronoImage.measureInWindow((a, b, width, height) => this.setState({ 
      x: a,
      y: b,
      w: width, 
      h: height})
    );
  }

  onAddPressed() {
    this.setState({time: this.state.time+1});
    this.refs.cronoImage.measureInWindow((a, b, width, height) => this.setState({ 
      x: a,
      y: b,
      w: width, 
      h: height})
    );
  }

  onNextOpButtonPressed() {
    if(this.state.time == 0) {
      return;
    }
    var nextOp = (this.state.nextOp == "Start") ? "Stop" : "Start";
    this.setState({nextOp: nextOp});
    console.log("123");
    if(nextOp == "Stop") {
      setTimeout(this.startCrono.bind(this));
    } else {
      setTimeout(this.stopCrono.bind(this));
    }
  }

  startCrono() {
    console.log("startCrono");
    timer.setInterval('crono', () => {
      console.log(this.state.time);
      this.setState({time: this.state.time-1});
      if(this.state.time == 0) {
        this.setState({nextOp: "Start"});
        Alert.alert("DING DING DING");
        setTimeout(this.stopCrono.bind(this));
      }
    }, 1000);
  }

  stopCrono() {
    console.log("stopCrono");
    timer.clearInterval('crono');
  }

  render() {
    var time = (this.state.time < 10) ? "0"+this.state.time+"s" : this.state.time+"s";
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Temporizador</Text>
        </View>
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
        <View style={styles.cronoContainer}>
          <Image 
            ref="cronoImage"
            style={styles.cronoImage}
            source={require('./crono.png')}/>
        </View>
        <View style={{
          top: this.state.y-24+this.state.h/5,
          left: this.state.x+this.state.w/2-10,
          position: 'absolute',
          transform: [
             {rotate: (this.state.time*6)+'deg'}
          ]
        }}>
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
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.nextOpButton}
            onPress={this.onNextOpButtonPressed.bind(this)}>
            <Text style={styles.nextOpButtonText}>{this.state.nextOp}</Text>
          </TouchableOpacity>
        </View>
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
    borderColor: 'gray', 
    borderWidth: 1,
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  nextOpButtonText: {
    fontSize: 20,
  },
});

AppRegistry.registerComponent('Crono', () => Crono);
