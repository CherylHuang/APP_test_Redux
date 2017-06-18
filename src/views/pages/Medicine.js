import React, { Component } from 'react';
import { ScrollView, Text, View, ListView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import MedicineList from './MedicineList';


// Make a component
class Medicine extends Component {

  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.libraries);
  }

  renderRow(medi) {
    return (
      <MedicineList
        medi = {medi}
      />
    );
  }

  // goToPageTwo = (medi) => {
  //   this.props.navigation.navigate('MedicineDetails', { ...medi });
  // };

  render() {
    const { container, direction, text, seg, icon } = styles;
    return (
    <View style={{flex:1}}>
          <View style={[container, direction]}>
              <View style={[direction, icon]}>
                <Text style={text}>全部</Text>
                <Icon name='arrow-drop-down' color='#517fa4' />
              </View>
          </View>
          <ListView
              style={{ backgroundColor: 'white' }}
              dataSource={this.dataSource}
              renderRow={this.renderRow}
          />
    </View>
    );
  }
}

const styles = {
    direction:{
      flexDirection:'row'
    },
    container:{
      backgroundColor:'white',
      paddingTop:5,
      paddingBottom:5,
      borderBottomWidth:1,
      borderColor:"#d7d7d7"
    },
    text:{
      fontSize:15,
      paddingLeft:10,
      color:'#517fa4'
    },
    icon:{
      flex:1,
      alignItems:'center'
    }
};

const mapStateToProps = state => {
  return { libraries: state.libraries }; //let state.libraries turn to props of Medicine 
};

// export default Medicine;
export default connect(mapStateToProps)(Medicine);