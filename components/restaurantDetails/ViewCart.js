import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderItems from './OrderItems'
import OrderCompleted from '../../screens/OrderCompleted'

export default function ViewCart( {navigation}) {

    const [modelVisible, setModelVisible] = useState(false)

    const { items, restaurantName } = useSelector(
        (state) => state.cartReducer.selectedItems)
        

    const total = items
        .map((item) => Number(item.price.replace("$", '')))
        .reduce((prev, curr) => prev + curr, 0)

    const totalUSD = total.toLocaleString(("en"), {
        style: "currency",
        currency: "USD",
    });

    const addOrderToFirebase=()=>{
        setModelVisible(false)
        navigation.navigate('OrderCompleted')
    }

    const styles = StyleSheet.create({
        modelContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: "rgba(0,0,0,0.7)"
        },
        moderCheckoutContainer: {
            backgroundColor: 'white',
            padding: 16,
            height: 500,
            borderWidth: 1
        },
        restaurantName: {
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 18,
            marginBottom: 10
        },
        subTotalConatiner: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
        },
        subTotalTextr: {
            textAlign: 'left',
            fontWeight: '600',
            fontSize: 15,
            marginBottom: 10

        }
    })

    const checkoutModelContent = () => {
        return (
            <>
                <View style={styles.modelContainer}>
                    <View style={styles.moderCheckoutContainer}>
                        <Text style={styles.restaurantName}>{restaurantName}</Text>
                        {items.map((item,index)=>(
                            <OrderItems key={index} item={item}/>
                        ))}
                        <View style={styles.subTotalConatiner}>
                            <Text style={styles.subTotalTextr}>Subtotal</Text>
                            <Text>{totalUSD}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity style={{
                                marginTop:20,
                                backgroundColor:'black',
                                alignItems:'center',
                                padding:13,
                                borderRadius:30,
                                width:300,
                                position:'relative'
                            }}
                            onPress={()=>{addOrderToFirebase()}}>
                            <Text style={{
                                color:'white',
                                fontSize:20
                            }}>Checkout</Text>
                            <Text style={{
                                position:'absolute',
                                right:20,
                                color:'white'
                            }}>{total ? totalUSD:''}</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
            </>

        )
    }
    return (
        <>
            <Modal
                animationType='slide'
                visible={modelVisible}
                transparent={true}
                onRequestClose={() => setModelVisible(false)}>
                {checkoutModelContent()}
            </Modal>
            {/* {total ? ( */}
            <View style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                position: 'absolute',
                bottom: 30,
                zIndex: 999
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <TouchableOpacity activeOpacity={1} style={{
                        marginTop: 20,
                        backgroundColor: 'black',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        padding: 15,
                        borderRadius: 30,
                        width: 300,
                        position: "relative"
                    }}
                        onPress={() => setModelVisible(true)}
                        onPressOut={() => console.log("price:: ", items)}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>View Cart</Text>
                        <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>{totalUSD}</Text>
                    </TouchableOpacity>

                </View>
            </View>
            {/* ) : ( */}
            {/* <></> */}
            {/* )} */}
        </>
    )
}