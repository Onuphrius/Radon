import React from 'react';
import { StyleSheet, Text, View, StatusBar, Linking, Image, Button} from 'react-native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class App extends React.Component {
  state = {
    status: "0",
    status_color: "#fff",
    message: "",
    time_window: "10080"
  }

  getStatus = () => {
    fetch("https://goldfisch.tk/status")
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          status: responseJson["status"],
          message: responseJson["message"]
        })
        var status_response = responseJson["status"]

        if (status_response == "1") {
          this.setState({
            status_color: "#00ff00"
          })
        } else if (status_response == "2") {
          this.setState({
            status_color: "#ffff00"
          })
        } else if (status_response == "3") {
          this.setState({
            status_color: "#ff0000"
          })
        } else {
          this.setState({
            status_color: "#fff"
          })
        }

      })
      .catch((error) => {
        console.error(error)
        this.setState({
          status: "0",
          status_color: "#fff",
          message: "",
        })
      });
  }


  componentDidMount = () => {
    this.getStatus()
    setInterval(this.getStatus, 30000)
  } 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusbar}></View>
        <View style={styles.github}>
          <Text style={{flex: 1, textAlign: 'left', color: 'blue', fontSize: windowHeight * 0.04}}
            onPress={() => Linking.openURL('https://github.com/Onuphrius')}>Onuphrius 
          </Text>
          <Text style={{flex: 1, textAlign: 'right', color: 'blue', fontSize: windowHeight * 0.04}}
            onPress={() => Linking.openURL('https://github.com/Qwert512')}>Qwert512
          </Text>
        </View>
        <View style={styles.graph}>
          <Image style={{width: '100%', height: '100%'}} source={{uri: `https://goldfisch.tk/visualize_data?time_window_mins=${this.state.time_window}&x_width=${(windowWidth / 45).toString()}&y_height=${(windowWidth / 45).toString()}`}} />
        </View>
        <View style={styles.time_button_view}>
          <Button style={styles.time_button} title='1h' onPress={() => this.setState({time_window: "60"})}></Button>
          <Button style={styles.time_button} title='1d' onPress={() => this.setState({time_window: "1440"})}></Button>
          <Button style={styles.time_button} title='1w' onPress={() => this.setState({time_window: "10080"})}></Button>
          <Button style={styles.time_button} title='1m' onPress={() => this.setState({time_window: "40320"})}></Button>
          <Button style={styles.time_button} title='1y' onPress={() => this.setState({time_window: "483840"})}></Button>
          <Button style={styles.time_button} title='All' onPress={() => this.setState({time_window: "0"})}></Button>
        </View>
        <View style={styles.status_button}>
          <View style={[styles.status,  {backgroundColor: this.state.status_color}]}></View>
        </View>
        <View style={styles.text}>
          <Text style={{textAlign: "center", fontSize: windowHeight * 0.04}}>{this.state.message}</Text>
        </View>
        <View style={styles.guide}></View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  statusbar: {
    height: StatusBar.currentHeight
  },
  github: {
    height: windowHeight * 0.05,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  graph: {
    minHeight: windowWidth,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  time_button_view: {
    minHeight: windowHeight * 0.05,
    borderBottomWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5
  },
  status: {
    borderRadius: 10,
    flex: 1
  },
  status_button: {
    minHeight: windowHeight * 0.175,
    borderBottomWidth: 1,
    padding: 10,
    borderColor: 'black'
  },
  text: {
    minHeight: windowHeight * 0.05 ,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  guide: {
    minHeight: windowHeight * 0.175,
    borderBottomWidth: 1,
    borderColor: 'black'
  },
  time_button: {
    maxWidth: windowWidth * 0.1,
    minWidth: windowWidth * 0.1
  }

});
