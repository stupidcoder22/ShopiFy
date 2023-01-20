import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { cartAdded, totalQuantity } from "../store/cartSlice";
import { useNavigation } from "@react-navigation/native";

const Card = ({ single: { item } }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartAdd = (single) => {
    dispatch(cartAdded(single));
    dispatch(totalQuantity());
  };

  return (
    <Pressable
      className="bg-white mb-8 rounded-2xl"
      onPress={() =>
        navigation.navigate("Detail", {
          items: item,
        })
      }
    >
      <View className="flex-row justify-around py-4 relative">
        <View className="w-2/6 items-center justify-center">
          <Image
            source={{ uri: item.image }}
            className="w-24 h-24"
            resizeMode="contain"
          />
        </View>
        <View className="w-3/6 items-center space-y-4">
          <Text className="px-4 pt-3 text-center">
            {item.title.split(" ").slice(0, 6).join(" ")}
          </Text>

          <View className="flex-row items-center">
            <Text className="mr-4 text-[#403b58]  font-bold text-lg">
              ${item.price}
            </Text>
            <View className="rounded-xl overflow-hidden bg-[#403b58]">
              <Pressable
                title="Buy"
                color="#1e183e"
                className=" px-5 py-2"
                android_ripple={{ color: "#5f597b" }}
                onPress={() => cartAdd(item)}
              >
                <Text className="text-white">Buy</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
