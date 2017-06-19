import React, { Component } from 'react';
import { TabNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Icon, Avatar } from 'react-native-elements';
import { Linking, ScrollView, Button, SegmentedControlIOS } from 'react-native';

import Medicine from './views/pages/Medicine';
import MedicineDetails from './views/pages/MedicineDetails';
import MedicineEdit from './views/pages/MedicineEdit';
import AddMedicine from './views/pages/AddMedicine';/////
import MedicineList from './views/pages/MedicineList'; //////

import Setting from './views/pages/Setting';
import EditPassword from  './views/pages/EditPassword';
import History from './views/pages/History';
import Today from './views/pages/Today';
import ChangeAccount from './views/pages/ChangeAccount';
import Account from './views/pages/Account';
import Remind from './views/pages/Remind';
import ClockDetails from './views/pages/ClockDetails';
import EditClock from './views/pages/EditClock';
import TimeTable from './views/pages/TimeTable';

import LoginScreen from './views/screens/LoginScreen';
import NewUserScreen from './views/screens/NewUserScreen';

import DeleteAddIcon from './views/components/delete_add';
import DeleteCalIcon from './views/components/delete_cal';

export const AccountStack = StackNavigator(
{
  Today: {
    screen: Today,
    navigationOptions: {
      header: ({navigate}) => ({
       left:(
          <Button
          title='變更成員'
          color = "#517fa4"
          onPress={() => navigate('ChangeAccount')}
          />
        ),
        right:(
          <Button
          title='編輯'
          color = "#517fa4"
          />
        ),
      })
    }
  },
  ChangeAccount: {
    screen: ChangeAccount,
    navigationOptions: {
      header: ({navigate}) => ({
        title:'變更成員',
        tintColor:"#517fa4",
        right:(
          <DeleteAddIcon />
        )
      })
    },
  },
}
);
export const MedicineStack = StackNavigator({
  Medicine: {
    screen: Medicine,
    navigationOptions: {
      header: ({navigate}) => ({
        title: '藥物管理',
        right:(
          <DeleteAddIcon />
        ),
        left:(
          <Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
          containerStyle={{marginLeft: 8,marginBottom:10}}
          onPress={() => navigate('Today')}
         />
        ),
      })
    },
  },
  MedicineDetails: {
    screen: MedicineDetails,
    navigationOptions: {
      header: ({ state, navigate }) => ({
        tintColor:"#517fa4",
        right:(
          <Button
          title='編輯'
          color = "#517fa4"
          onPress={() => navigate('MedicineEdit')}
          />
        ),
      })
    },
  },
  MedicineEdit: {
    screen: MedicineEdit,
    navigationOptions: {
      header: ({ state }) => ({
        title: '編輯藥物',
        tintColor:"#517fa4",
        right:(
          <Button
          title='完成'
          color = "#517fa4"
          /*onPress={() => navigate('EditClock')}*/
          />
        ),
      })
    },
  },
  AddMedicine: {
    screen: AddMedicine,
    navigationOptions: {
      header: () => ({
        title: '新增藥物',
        tintColor:"#517fa4",
        right:(
          <Button
          title='完成'
          color = "#517fa4"
          /*onPress={() => navigate('EditClock')}*/
          />
        ),
      })
    },
  },
},
{
  // headerMode: 'none',
}
);

export const RemindStack = StackNavigator({
  Remind: {
    screen: Remind,
    navigationOptions: {
      header: ({navigate}) => ({

        title: '服藥提醒',
        right:(
          <DeleteAddIcon />
        ),
        left:(
          <Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
          containerStyle={{marginLeft: 8,marginBottom:10}}
          onPress={() => navigate('Today')}
          
         />
        ),
      })
    },
  },
  ClockDetails: {
    screen: ClockDetails,
    navigationOptions: {
      header: ({ state, navigate }) => ({
        tintColor:"#517fa4",
        right:(
          <Button
          title='編輯'
          color = "#517fa4"
          onPress={() => navigate('EditClock')}
          />
        ),
      })
    },
  },
   EditClock: {
    screen: EditClock,
    navigationOptions: {
      header: ({navigate}) => ({
        title: '編輯鬧鐘',
        tintColor:"#517fa4",
        right:(
          <Button
          title='完成'
          color = "#517fa4"
          /*onPress={() => navigate('ClockDetails')}*/
          />
        ),
        /*left:(
          <Button
          title='取消'
          color = "#517fa4"
          />
        ),*/
      })
    },
  },
  TimeTable: {
    screen: TimeTable,
    navigationOptions: {
      header: ({ navigate }) => ({
        tintColor:"#517fa4",
        right:(
          <Button
          title='編輯'
          color = "#517fa4"
          /*onPress={() => navigate('EditTable')}*/
          />
        ),
      })
    },
  },
},
{
  // headerMode: 'none',
}
);

export const HistoryStack = StackNavigator({
  Setting: {
    screen: History,
    navigationOptions: {
      header: ({navigate}) => ({
        title: '歷史紀錄',
        left:(
          <Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
          containerStyle={{marginLeft: 8,marginBottom:10}}
          onPress={() => navigate('Today')}
          
         />
        ),
        right:(
       <DeleteCalIcon />
        ),
      })
    },
  },
});

export const SettingStack = StackNavigator({
  Setting: {
    screen: Setting,
    navigationOptions: {
      header: ({navigate}) => ({
        title: '設定',
      })
    },
  },
   Account: {
    screen: Account,
    navigationOptions: {
      header: ({state}) => ({
        title:'我的帳戶',
        tintColor:"#517fa4",
      })
    },
  },
  EditPassword: {
    screen: EditPassword,
    navigationOptions: {
      header: () => ({
        title: '密碼設定',
        tintColor:"#517fa4",
      })
    },
  }, 
},
{
  // headerMode: 'none',
}
);


export const TabRouter = TabNavigator(
  {
    AccountStack: {
      screen: AccountStack,
      navigationOptions: {
        tabBar: {
          label: '今日藥物',
          icon: ({ tintColor }) => <Icon name="local-drink" size={30} color={tintColor} />
        },
      },
    },
     MedicineStack: {
      screen: MedicineStack,
      navigationOptions: {
        tabBar: {
          label: '藥物管理',
          icon: ({ tintColor }) => <Icon name="storage" size={30} color={tintColor} />
        },
      },
    },
    RemindStack: {
      screen: RemindStack,
      navigationOptions: {
        tabBar: {
          label: '服藥提醒',
          icon: ({ tintColor }) => <Icon name="alarm" size={30} color={tintColor} />
        },
      },
    },
    HistoryStack: {
      screen: HistoryStack,
      navigationOptions: {
        tabBar: {
          label: '歷史紀錄',
          icon: ({ tintColor }) => <Icon name="assignment" size={30} color={tintColor} />
        },
      },
    },
    SettingStack: {
      screen: SettingStack,
      navigationOptions: {
        tabBar: {
          label: '設定',
          icon: ({ tintColor }) => <Icon name="settings" size={30} color={tintColor} />
        },
      },
    },
  },
  {
    animationEnabled: 'true',
    tabBarOptions:{
      activeTintColor:'#ffffff',
      activeBackgroundColor:'#517fa4',
      headerMode: 'screen',
    }
  }
);

export const LoginStack = StackNavigator({
    LoginScreen: {screen: LoginScreen},
    NewUserScreen: {screen: NewUserScreen},
    TabRouter: {screen: TabRouter}
  },
  {
    headerMode: 'none',
  }
);


///////////////////////////////////////////////////////////

/*const AppNavigator = StackNavigator(AppRouteConfigs);
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer
});

class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}*/

// const store = createStore(appReducer);




// const AppWithNavigationState = ({ dispatch, nav }) => (
//   <TabRouter navigation={addNavigationHelpers({ dispatch, state: nav })} />
// );

// const mapStateToProps = (state) => ({
//   nav: state.nav
// });

// export default connect(mapStateToProps)(AppWithNavigationState);



/*class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}*/