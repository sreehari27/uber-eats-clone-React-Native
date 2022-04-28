import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React,{useState} from 'react';
import { Divider } from 'react-native-elements';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from "react-redux"


const foods = [
    {
        title: "Kuzhimanthi",
        description: "Arabic chicken dish, Backed chicken without oil",
        price: "$40.21",
        image: "https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/wga6rcoaeey0dionhfjh"
    },
    {
        title: "Chicken Alfaham",
        description: "Chicken Coocked with flame, Delitious South Indian Dish",
        price: "$39.21",
        image: "https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2021/2/14/alfaham.jpg"
    },
    {
        title: "Burger",
        description: "A hamburger is a food consisting of fillings",
        price: "$14.32",
        image: "https://images.indulgexpress.com/uploads/user/imagelibrary/2021/2/17/original/1mae-mu-I7A_pHLcQK8-unsplash_revised.jpg"
    },
    {
        title: "Mutton Biriyani",
        description: "Mutton biryani is a delicious dish made of meat, spices, herbs & yogurt",
        price: "$25.21",
        image: "https://www.licious.in/blog/wp-content/uploads/2019/11/Mutton-Biryani-1-1024x1024.jpg"
    },
    {
        title: "Steak",
        description: "A steak is a meat generally sliced across the muscle fibers, potentially including a bone",
        price: "$24.12",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RlYWt8ZW58MHx8MHx8&w=1000&q=80"
    }
];




const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20
    }
})

export default function MenuItems({
    restaurantName,
    // foods
}) {

    const despatch = useDispatch()

    const selectItem = (item, checkBoxValue) => 
    despatch({
        type: "ADD_TO_CART",
        payload: {
            ...item,
            restaurantName: restaurantName,
            checkBoxValue: checkBoxValue
        },
    })

    const cartItems = useSelector(
        (state) => state.cartReducer.selectedItems.items
    );

    const isFoodInCart = (food, cartItems) =>
        Boolean(cartItems.find((item) => item.title === food.title));

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {foods.map((food, index) => (
                <View key={index} >
                    <View style={styles.menuItemStyle}>
                        <BouncyCheckbox iconStyle={{
                            borderRadius: 5,
                            borderColor: "lightgray"
                        }}
                            fillColor='green'
                            isChecked={isFoodInCart(food, cartItems)}
                            onPress={(checkBoxValue) => selectItem(food, checkBoxValue)}
                            // onPressOut={()=>console.log(foods)}
                        />
                        <FoodInfo food={food} />
                        <FoodImage food={food} />
                    </View>
                    <Divider width={0.5} orientation="vertical" style={{ marginHorizontal: 20 }} />
                </View>
            ))}
        </ScrollView>
    )
}

const FoodInfo = (props) => (
    <View style={{ width: 240, justifyContent: "space-between" }}>
        <Text style={{ fontSize: 19, fontWeight: '600' }}>{props.food.title}</Text>
        <Text>{props.food.description}</Text>
        <Text>{props.food.price}</Text>
    </View>
)

const FoodImage = (props) => (
    <View>
        <Image source={{ uri: props.food.image }} style={{ height: 100, width: 100, borderRadius: 8 }} />
    </View>
)