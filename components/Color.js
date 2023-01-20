import { ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Color = ({ categorylist }) => {
  const [btnColor, setbtnColor] = useState(true);

  const selectColors = (item) => {
    setbtnColor(item);
  };
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {categorylist.map((item, index) => {
        return (
          <TouchableOpacity
            className={`mr-3 px-6 py-6  rounded-md`}
            key={index}
            onPress={() => selectColors(item)}
            style={{
              backgroundColor: item,
              borderColor: btnColor == item ? "" : "#403b58",
            }}
          ></TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Color;
