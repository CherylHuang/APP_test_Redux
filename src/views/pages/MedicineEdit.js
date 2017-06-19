import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

// import medi from '../../reducers/json/medicine.json';

// Make a component
class MedicineEdit extends Component {
  // state = { medi: [] };

  // componentWillMount(newProps) {
    // this.setState({ medi });
  // }

  componentWillReceiveProps(nextProps) {
    let data = nextProps.data;
    if (nextProps.data !== this.props.medi) {
      // let data = this._getListViewData(nextProps.medi);
      data = data.map((medicine) => {
        return medicine;
    });
      this.setState({
        medi: this.state.dataSource.cloneWithRowsAndSections(data)
      })
    }
  }

  //  _getListViewData(medi) {
  //   let data = {};
    
  //   medi.map((patient) => {
  //     let section = patient.lastName.charAt(0);
  //     if (sectionIds.indexOf(section) === -1) {
  //       sectionIds.push(section);
  //       data[section] = [];
  //     }
  //     data[section].push(patient);
  //   });

  //   return data;
  // }

  render() {
        const { flex, img, icon, icon_pos, title, righttitle } = styles;
        const { medi } = this.props;
    return (
      <ScrollView>
          <View style={flex}>
            <Image source={{uri: medi.image }} 
            style={img}
            />
            <View style={icon_pos}>
                <Icon name='photo-camera' color='white'
                underlayColor='#b9d0e3' size={25}
                containerStyle={icon}
                onPress={()=>{}} />
            </View>
          </View>

        <List>
          <ListItem
            title={
            <View style={{flexDirection:'row'}}>
                <Text style={title}>  名稱   </Text>
                <Text style={{fontSize:17, color: '#bdc6cf'}}>{medi.title} </Text>
                <Icon name='edit' color='#517fa4' onPress={()=>{}} />
            </View>
                }
            hideChevron
          />
          <ListItem
            title="分類"
            titleStyle={title}
            /*rightTitle={`${medi.kind.IO}/${medi.kind.WE}/${medi.kind.type}`}*/
            rightTitleStyle={righttitle}
          />
          <ListItem
            title="時段"
            titleStyle={title}
            rightTitle={'早/中/晚/睡前'}
            rightTitleStyle={righttitle}
          />
          <ListItem
            title="效用"
            titleStyle={title}
            rightTitle={medi.effect}
            rightTitleStyle={righttitle}
          />
          <ListItem
            title="副作用"
            titleStyle={title}
            rightTitle={medi.subeffect}
            rightTitleStyle={righttitle}
          />
          <ListItem
            title="注意事項"
            rightTitle={medi.warn}
            titleStyle={title}
          />
          <ListItem
            title="本次服用原因"
            rightTitle={medi.reason}
            titleStyle={title}
          />
          <ListItem
            title="備註"
            rightTitle={medi.other}
            titleStyle={title}
          />
        </List>
       
      </ScrollView>
    );
  }
}
const styles = {
  flex:{
    flex:1
  },
  icon_pos:{
    alignSelf:'center',
    width:130
  },
  img:{
    alignSelf:'center',
    width:150,
    height:150,
    borderRadius:75,
    marginTop:30
  },
  icon:{
    alignSelf:'flex-end',
    marginTop:-45,
    backgroundColor:'#517fa4',
    width:40,
    height:40,
    borderRadius:20
  },
  title:{
    fontSize:18
  },
  righttitle:{
    fontSize:15
  }
}

// export default MedicineEdit;

const mapStateToProps = state => {
  return { medi: state.medi }; //let state.libraries turn to props of Medicine 
};

// export default Medicine;
export default connect(mapStateToProps)(MedicineEdit);