import { View, Text, Modal, Pressable, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import Verify from "react-native-vector-icons/MaterialIcons";
import { setModal } from "../store/cartSlice";
import { useNavigation } from "@react-navigation/native";

const PaymentModal = () => {
  const {
    cartStore: { modal },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  return (
    <Modal visible={modal} animationType="slide" transparent={true}>
      <View className="bg-[#FFFFFF] flex-1 bg-red mt-[90%] h-56 rounded-3xl relative">
        <Pressable
          onPress={() => dispatch(setModal(false))}
          className="absolute right-5 top-0 mt-3"
        >
          <Icon name="close" size={40} />
        </Pressable>
        <View className="space-y-3 items-center justify-center mt-16">
          <View className="bg-[#F3F4FB] p-[40px] rounded-full">
            <Verify name="verified" size={60} color="#5BBE60" />
          </View>
          <View>
            <Text className="font-semibold text-xl">Payment Successfull</Text>
          </View>

          <View>
            <Text className="text-gray-500 mx-8 text-base text-center">
              Your Payment was successfully Completed!
            </Text>
          </View>
          <View className="rounded-xl overflow-hidden bg-[#3c3754] mt-8">
            <Pressable
              className="py-3 px-3"
              onPress={() => {
                navigate.navigate("Home");
                dispatch(setModal(false));
              }}
              android_ripple={{ color: "#5f597b" }}
            >
              <Text className="text-white text-base font-bold text-center">
                Shop More
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
