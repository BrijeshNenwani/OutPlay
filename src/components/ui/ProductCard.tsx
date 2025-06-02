import React, { memo, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "../../constants/colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}

function ProductCard({
  product,
  onPress,
}: {
  product: ProductCardProps;
  onPress: (id: number) => void;
}) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="flex-1 m-1 rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden"
      style={{ maxWidth: "48%" }}
      onPress={() => onPress(product?.id)}
    >
      {/* Image */}
      <View className="relative">
        <Image
          source={{ uri: product?.thumbnail }}
          className="w-full aspect-square bg-gray-100"
          resizeMode="cover"
        />
      </View>

      {/* Info Section */}
      <View className="px-3 py-3 bg-white space-y-1">
        <Text
          className="text-sm font-semibold text-neutral-900 leading-tight"
          numberOfLines={2}
        >
          {product?.title}
        </Text>

        {/* Category and Price row */}
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-neutral-400 capitalize">
            {product?.category}
          </Text>
          <Text className="text-base font-bold text-primary">
            ${product?.price?.toFixed(2)}
          </Text>
        </View>

        {/* Bottom Row: Add to Cart (left) and Like (right) */}
        <View className="flex-row justify-between items-center mt-4">
          {/* Add to Cart Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center bg-primary rounded-md px-3 py-2"
            onPress={() => {}}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              size={20}
              color={colors.white}
            />
            <Text className="text-white font-semibold ml-2">Add to Cart</Text>
          </TouchableOpacity>

          {/* Like Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-row items-center bg-gray-100 rounded-md px-3 py-2 ml-2"
            onPress={() => setLiked(!liked)}
          >
            <FontAwesome
              name="heart"
              size={20}
              color={liked ? colors.error : colors.gray500}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default memo(ProductCard);
