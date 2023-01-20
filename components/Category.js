import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct, setbyCategory } from "../store/apiCall";

const Category = ({ categorylist, text }) => {
  const [btnColor, setbtnColor] = useState(text);
  const dispatch = useDispatch();

  const selectColors = (item) => {
    setbtnColor(item);
    if (text.length === 1) {
      return;
    }
    dispatch(setbyCategory(item));
  };
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {categorylist.map((item, index) => {
        return (
          <Pressable
            className={`mr-3 px-4 py-3 rounded-md`}
            key={index}
            onPress={() => selectColors(item)}
            style={{
              backgroundColor: btnColor == item ? "#403b58" : "white",
              borderColor: btnColor == item ? "" : "#403b58",
              borderWidth: 1,
            }}
          >
            <View>
              <Text
                className={`${btnColor === item ? "text-white" : "text-black"}`}
              >
                {item}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

export default Category;
