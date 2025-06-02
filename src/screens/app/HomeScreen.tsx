import React, { useState, useMemo, useCallback } from "react";
import { BackHandler, TouchableOpacity, View } from "react-native";
import InfinityList from "../../components/controllers/InfinityList";
import ProductCard, { ProductCardProps } from "../../components/ui/ProductCard";
import APIRoutes from "../../constants/api_routes";
import SearchBar from "../../components/controllers/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import useBackButtonHandler from "../../hooks/back-handler";
import Header from "../../components/ui/Header";
import LogoutButton from "../../components/controllers/LogoutButton";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export default function HomeScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  // const url = useProductQueryUrl({ // tried building a product url generator for advanced filtering and
  // search functionality with fully dynamic behaviour but ran out of time. it does work but has some issues
  //   category: "beauty",
  //   search: "ipho",
  //   limit: 20,
  // });
  // console.log("Url", url);
  const handleProductPress = (id: number) => {
    navigation.navigate("ProductDetails", { productId: id });
  };

  useBackButtonHandler();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        heading="Featured Products"
        onBackPress={() => {
          BackHandler.exitApp();
        }}
        rightComponent={
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
              className=" flex justify-center items-center  "
              style={{
                marginRight: 8,
                width: 32,
                height: 32,
                borderRadius: "100%",
              }}
            >
              <MaterialCommunityIcons
                className="p-1.5 rounded-full bg-gray-100"
                name="cart-outline"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>
            <LogoutButton />
          </View>
        }
      />
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search products..."
      />

      <InfinityList
        url={APIRoutes.products}
        dataKey="products"
        pageSize={10}
        renderItem={({ item }: { item: ProductCardProps }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        keyExtractor={({ id }) => id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 6 }}
      />
    </SafeAreaView>
  );
}
