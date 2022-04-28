import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import About from '../components/restaurantDetails/About'
import { Divider } from 'react-native-elements'
import MenuItems from '../components/restaurantDetails/MenuItems'
import ViewCart from '../components/restaurantDetails/ViewCart'

export default function RestaurantDetails({route, navigation}) {
  return (
    <View style={{flex:1}}>
      <About route={route} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
        <MenuItems restaurantName={route.params.name} />
        <ViewCart navigation={navigation} />
    </View>
  )
}