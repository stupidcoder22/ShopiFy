import { FlatList, View } from "react-native";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/apiCall";
import Card from "./Card";

const Cards = () => {
  const dispatch = useDispatch();
  const {
    api: { data },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);
  return (
    <FlatList
      data={data}
      renderItem={(item, index) => <Card single={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={{ width: "100%", height: "100%" }}
      scrollEnabled={true}
      contentContainerStyle={{
        paddingTop: 10,
      }}
    />
  );
};
export default Cards;
