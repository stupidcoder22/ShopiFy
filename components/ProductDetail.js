import { View, Text, Pressable, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import Category from "./Category";
import Color from "./Color";
import { favorite } from "../store/apiCall";
import { useDispatch } from "react-redux";
import { cartAdded, totalQuantity } from "../store/cartSlice";
import { useNavigation } from "@react-navigation/native";

const ProductDetail = ({
  route: {
    params: { items },
  },
}) => {
  const categorylist = ["S", "M", "L", "XL", "XXL"];
  const allcolor = ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"];
  const dispatch = useDispatch();
  const [favo, setfavo] = useState(items.heart);

  const navigation = useNavigation();
  const changeFavorite = (item) => {
    setfavo(!favo);
    dispatch(favorite(item));
  };

  return (
    <SafeAreaView className="flex-1 mt-5 mx-6">
      <View className="flex-row justify-between">
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrowleft" size={30} />
        </Pressable>
        {favo ? (
          <Pressable onPress={() => changeFavorite(items)}>
            <Icon name="heart" size={26} color="red" />
          </Pressable>
        ) : (
          <Pressable onPress={() => changeFavorite(items)}>
            <Icon name="hearto" size={26} color="red" />
          </Pressable>
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
      >
        <View className="mt-4 items-center">
          <Text className="text-xl font-bold text-center">
            {items.title.split(" ").slice(0, 3).join(" ")}
          </Text>
          <View className="flex-row mt-3 space-x-2 items-center">
            <Icon name="star" color="#FDCC0D" size={23} />
            <View className="flex-row">
              <Text className="font-bold text-lg">{items.rating.rate} </Text>
              <View className="justify-center">
                <Text className="text-gray-500 text-base">
                  ({items.rating.count} ratings)
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-3 items-center">
          <Image
            source={{ uri: items.image }}
            className="w-[100%] h-64"
            resizeMode="contain"
          />
        </View>
        <View className="mt-6">
          <Text className="font-semibold text-xl mb-4">Select Sizes</Text>
          <Category categorylist={categorylist} text="L" />
        </View>

        <View className="mt-6 mb-6">
          <Text className="font-semibold text-xl mb-4">Select Color</Text>
          <Color categorylist={allcolor} />
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-xl">${items.price}</Text>
          <View className="rounded-xl overflow-hidden bg-[#403b58]">
            <Pressable
              title="Buy"
              color="#1e183e"
              className=" px-4 py-3"
              android_ripple={{ color: "#5f597b" }}
              onPress={() => {
                dispatch(cartAdded(items));
                dispatch(totalQuantity());
              }}
            >
              <Text className="text-white font-semibold">Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
