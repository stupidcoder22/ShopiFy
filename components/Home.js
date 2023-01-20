import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import Category from "./Category";
import Cards from "./Cards";
import Cart from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { totalAmount } from "../store/cartSlice";
import { setbyCategory } from "../store/apiCall";

const Home = () => {
  const category = ["All", "Women", "Men", "Electronics", "Jewellery"];
  const [input, setinput] = useState("");
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const travelCart = () => {
    dispatch(totalAmount());
    navigate.navigate("Cart");
  };
  const {
    cartStore: { quantity },
  } = useSelector((state) => state);

  const changeHandler = (text) => {
    setinput(text);
  };


  return (
    <SafeAreaView className="flex-1 px-5 mt-4 bg-[#eee9e9]">
      <View className="mb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-[#47445a] text-2xl font-bold">ShopiFy</Text>
          <Text className="text-gray-500 text-base">Perfect Choice</Text>
        </View>
        <Pressable onPress={travelCart}>
          <View className="pr-4 relative flex-row">
            <Cart name="shopping-cart" size={30} color="#403b58" />
            <View className="w-5 h-5 bg-[#403b58] rounded-full absolute right-2 bottom-[16px] justify-center items-center">
              <Text className="text-white text-xs font-bold">{quantity}</Text>
            </View>
          </View>
        </Pressable>
      </View>

      <View className="flex-row items-center bg-white py-2 space-x-3 px-2 rounded-md">
        <Pressable onPress={() => dispatch(setbyCategory(input))}>
          <Icon name="search1" size={20} />
        </Pressable>
        <TextInput
          placeholder="search by category"
          className="text-black flex-1"
          value={input}
          onChangeText={(text) => changeHandler(text)}
        />
      </View>

      <View className="mt-6">
        <Category categorylist={category} text="All" />
      </View>

      <View className="mt-4 flex-1">
        <Cards />
      </View>
    </SafeAreaView>
  );
};

export default Home;
