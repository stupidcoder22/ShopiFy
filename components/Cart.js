import { View, Text, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyCart from "./EmptyCart";
import PaymentModal from "./PaymentModal";
import SingleCart from "./SingleCart";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../store/cartSlice";

const Cart = () => {
  const {
    cartStore: { cart, total },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="flex-1 px-5 mt-4 bg-[#eee9e9]">
      {cart.length === 0 && <EmptyCart />}
      {cart.length > 0 && (
        <View className="flex-1">
          <View className="items-center flex-row justify-between">
            <Text className="text-xl font-bold">Cart</Text>
            <View className="flex-row items-center">
              <Text className="text-3xl font-bold text-green-500 pr-[1px]">
                $
              </Text>
              <Text className="text-xl font-bold text-green-500">{total}</Text>
            </View>
          </View>
          <SingleCart />
          <View className="mt-6">
            <Text className="text-xl font-bold items-center text-center mb-2">
              Payment Summary
            </Text>
            <View className="bg-white p-4 rounded-xl mt-2 space-y-2">
              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">SubTotal</Text>
                  <Text className="font-bold">${total}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Fee and Delivery</Text>
                  <Text className="font-bold">$0.0</Text>
                </View>
              </View>
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: "#C8C8C8" }}
              ></View>
              <View>
                <View className="flex-row justify-between">
                  <Text className="font-bold">Total Price</Text>
                  <Text className="font-bold">${total}</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="rounded-xl overflow-hidden bg-[#3c3754] mt-8 mb-4">
            <Pressable
              className="py-3"
              onPress={() => {
                dispatch(setModal(true));
              }}
              android_ripple={{ color: "#5f597b" }}
            >
              <Text className="text-white text-base font-bold text-center">
                Pay Now
              </Text>
            </Pressable>
          </View>
          <PaymentModal />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
