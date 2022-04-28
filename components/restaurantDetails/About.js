import { View, Text, Image } from 'react-native'
import React from 'react'

const yelpRestaurantinf={
  name: 'Farmhouse Kitchen',
  image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHN8ZW58MHx8MHx8&w=1000&q=80",
  price:"$$",
  reviews: 1244,
  rating:4.5,
  categories:[{title:'Thai'},{title:'comfort food'}]
}




export default function About(props) {
  const {name, image, price, reviews, rating, categories}=props.route.params

const formatedCategories =categories.map((cat)=>cat.title).join(' . ')

const description=`${formatedCategories} ${price ? '.'+ price:''} ${rating} ${reviews}`
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  )
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }}
    style={{ width: "100%", height: 180 }} />
)

const RestaurantName = (props) => (
  <Text style={{ fontSize: 29, marginTop: 10, marginHorizontal: 15, fontWeight: '600' }}>{props.name}</Text>
)

const RestaurantDescription = (props) => (
  <Text style={{
    fontSize: 15,
    marginTop: 10,
    marginHorizontal: 15,
    fontWeight: '400'
  }}>{props.description}</Text>
)