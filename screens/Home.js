import { View, Text, SafeAreaView, ScrollView, } from 'react-native'
import React, { useState, useEffect } from 'react'
import HeaderTab from '../components/home/HeaderTab'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItems, {
  localRestaurants
} from '../components/home/RestaurantItems';
import { Divider } from 'react-native-elements'
import BottomTab from '../components/home/BottomTab'

const YELP_API_KEY = "bdRJutLhFAQJ36t7b89CWjHFBU4OKzjt9wvZzcY-nkgmvTqlNMjZWV1eG7iBQ9R74SyfxRg9LWnBAkZY06BtAZAe4d2dfX-2vuX8a1l5V7foctHfX9UKEyoM5ts3YXYx";

export default function Home({navigation}) {

  const [restaurantData, setRestaurantData] = useState(localRestaurants)
  const [city, setCity] = useState('San Fransisco')
  const [activeTab, setActiveTab] = useState('Delivery')

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`


    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => setRestaurantData(json.businesses.filter(
        (business) => business.transaction.includes(activeTab.toLowerCase()))))
  };

  useEffect(() => {
    // getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }} >
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurantData={restaurantData} navigation={navigation} />
      </ScrollView>
      <Divider width={1} />
      <BottomTab />
    </SafeAreaView>
  )
}

