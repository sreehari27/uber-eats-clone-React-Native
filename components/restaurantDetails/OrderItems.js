import { View, Text } from 'react-native'
import React from 'react'

export default function OrderItems(item) {
    const {title, price}=item
  return (
    <View style={{flexDirection:'row', 
    justifyContent:'space-between',
    padding:20,
    borderBottomWidthWidth:1,
    borderBottomColor:'#999'}}>
      <Text style={{fontWeight:'600', fontSize:16}}>{title}</Text>
      <Text style={{fontWeight:'600', fontSize:16}}>{price}</Text>
    </View>
  )
}