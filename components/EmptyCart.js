import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold text-2xl">Your Cart is Empty Bro</Text>
      <TouchableOpacity
        className="bg-[#403b58] mt-4 p-4 rounded-lg"
        onPress={() => navigation.navigate("Home")}
      >
        <Text className="text-white font-bold text-sm">Buy Something</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;
