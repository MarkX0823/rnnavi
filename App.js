import React from "react";
import { Button, View, Text, Image, Dimensions, Linking, TouchableHighlight } from "react-native";
import { SearchBar } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

var samples = new Array();
samples.push('one');
samples.push('two');
samples.push('three');
samples.push('four');
samples.push('five');

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button 
          title="Go to Details"
          onPress={() => this.props.navigation.push('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings Screen</Text>
        <Button 
          title="Go to Profile"
          onPress={() => this.props.navigation.push('Profile')}
        />
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  state = {
    search: '',
    result: '',
  };

  updateSearch = search => {
    result = '';

    for (let i = 0; i < samples.length; i++) {
      s = samples[i];
      if (search.toUpperCase() === s.toUpperCase()) {
        result = s;
        break;
      }
    }

    this.setState({ search, result });
  };

  render() {
    const { search } = this.state;
    
    return (
      <View>
        <SearchBar 
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
          <Text>
            {this.state.result} 
          </Text>
        </View>
      </View>
    );
  }
}

const {width, height} = Dimensions.get("window")

class ImageScreen extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={ () => Linking.openURL('https://www.google.com') }>
        <Image 
          source={require('./img/architecture-bridge-buildings-374685.jpg')} 
          resizeMode='contain'
          style={{
            maxHeight: height,
            maxWidth: width
          }}
        />
      </TouchableHighlight>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Search"
  }
);

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Profile: ProfileScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    Search: SearchScreen,
    Image: ImageScreen,
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
