import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartAdded,
  deleteItem,
  minusAmount,
  totalAmount,
  totalQuantity,
} from "../store/cartSlice";

const SingleCart = () => {
  const {
    cartStore: { cart },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeinItemAmount = (item) => {
    dispatch(cartAdded(item));
    dispatch(totalAmount());
    dispatch(totalQuantity());
  };

  const removeonzero = (item) => {
    dispatch(minusAmount(item));
    dispatch(totalAmount());
    dispatch(totalQuantity());

    if (item.amount == 1) {
      dispatch(deleteItem(item));
    }
  };
  return (
    <ScrollView
      className="mt-5 flex-grow-0"
      showsVerticalScrollIndicator={false}
    >
      {cart.map((item, index) => {
        return (
          <View
            className="p-4 flex-row justify-between items-center bg-white mb-6 rounded-lg"
            key={index}
          >
            <View className="">
              <Image
                source={{ uri: item.image }}
                className="w-12 h-12"
                resizeMode="contain"
              />
            </View>
            <View className="space-y-1">
              <Text className="">
                {item.title.split(" ").slice(0, 3).join(" ")}
              </Text>
              <Text className="font-bold text-base">${item.price}</Text>
            </View>
            <View className="space-y-[1px]">
              <Pressable
                className=" w-6 h-6 items-center border-2 rounded-full border-[#403b58]"
                onPress={() => removeonzero(item)}
              >
                <Text>-</Text>
              </Pressable>
              <Text className="text-center font-bold">{item.amount}</Text>
              <Pressable
                className="w-6 h-6 items-center border-2 rounded-full border-[#403b58]"
                onPress={() => changeinItemAmount(item)}
              >
                <Text className="">+</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default SingleCart;
