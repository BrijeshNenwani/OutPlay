import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  BackHandler,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useApi from "../../hooks/api";
import colors from "../../constants/colors";
import TouchButton from "../../components/controllers/TouchButton";
import Header from "../../components/ui/Header";
import { useCart } from "../../hooks/cart";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ProductDetailsScreen({ navigation }) {
  const route = useRoute();
  const { productId } = route.params as { productId: number };
  const { getProductDetails } = useApi();
  const [product, setProduct] = useState(null);

  const { addToCart, items } = useCart();
  // const [quantity, setQuantity] = useState(1);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeImage, setActiveImage] = useState(0);
  const flashListRef = useRef<FlatList>();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (product?.images?.length > 1) {
      timer = setTimeout(() => {
        setActiveImage((prev) => (prev + 1) % product?.images?.length);
      }, 5000);
      flashListRef.current.scrollToIndex({
        index: activeImage,
        animated: true,
      });
    }
    return () => clearTimeout(timer);
  }, [activeImage, product]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await getProductDetails(productId)
        .then((res) => {
          setProduct(res);
        })
        .catch((e) => {
          // console.log("Error fetching data:", e);
          setError("Error fetching data. " + (e?.message ?? "Failed to fetch"));
        });
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setActiveImage(index);
    // console.log("Active index:", index);
  };

  // Cart logic
  const handleAddToCart = () => {
    const { id: productId, title, price, thumbnail } = product;
    addToCart({
      productId,
      title,
      price,
      thumbnail,
      quantity: 1,
    });
  };

  const existingItem = items.find((item) => item?.productId == product?.id);
  const addedQuantity = existingItem ? existingItem.quantity : 0;

  return product || isLoading ? (
    <ScrollView className="flex-1 bg-background-light">
      <Header
        heading={product?.title}
        onBackPress={() => {
          navigation.goBack();
        }}
      />

      {/* Image Carousel */}
      <FlatList
        ref={flashListRef}
        data={product?.images}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={handleMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri) => uri}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{ width: SCREEN_WIDTH, height: 280 }}
            className="bg-gray-100"
            resizeMode="contain"
          />
        )}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
      >
        {product?.images?.map((item: string, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setActiveImage(index);
            }}
            style={{
              width: 100,
              height: 100,
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginHorizontal: 5,
              backgroundColor: colors.backgroundLight,
              borderColor:
                activeImage === index ? colors.accent : colors.border,
              borderWidth: 1,
            }}
          >
            <Image
              src={item}
              resizeMode="contain"
              style={{
                padding: 20,
                width: 90,
                height: 90,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className=" px-4 pt-5 pb-20 space-y-6">
        {/* Title & Brand */}
        <View className="mb-2 space-y-1">
          <Text className="text-text-primary text-xl font-bold leading-tight">
            {product?.title}
          </Text>
          <Text className="text-accent text-xs uppercase tracking-widest font-semibold">
            {product?.brand}
          </Text>
        </View>

        {/* Price & Rating */}
        <View className="mb-5 flex-row items-center justify-between">
          <View className="flex-row items-end space-x-2">
            <Text className="text-primary text-2xl font-extrabold">
              ${product?.price.toFixed(2)}
            </Text>
            {product?.discountPercentage > 0 && (
              <Text className="text-success text-xs font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                -{(product?.discountPercentage * 100).toFixed(0)}%
              </Text>
            )}
          </View>
          <Text className="text-yellow-500 text-sm font-semibold">
            ⭐ {product?.rating.toFixed(1)}
          </Text>
        </View>

        {/* Stock & Category */}
        <View className="mb-5 flex-row justify-between items-center">
          <Text className="text-sm text-text-muted">
            Category:{" "}
            <Text className="capitalize text-md text-text-secondary font-semibold">
              {product?.category.replace("-", " ")}
            </Text>
          </Text>
          <Text
            className={`text-xs font-semibold ${
              product?.availabilityStatus === "In Stock"
                ? "text-success"
                : "text-error"
            }`}
          >
            {product?.availabilityStatus} ({product?.stock} left)
          </Text>
        </View>

        {/* Description */}
        <View className="mb-5 bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <Text className="text-text-primary font-semibold mb-2 text-base">
            Description
          </Text>
          <Text className="mb-5 text-text-muted text-sm leading-relaxed">
            {product?.description}
          </Text>
        </View>

        {/* Specifications */}
        <View className="mb-5 bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-2">
          <Text className="text-text-primary font-semibold mb-1 text-base">
            Specifications
          </Text>
          <Text className="text-xs text-text-muted">SKU: {product?.sku}</Text>
          <Text className="text-xs text-text-muted">
            Weight: {product?.weight} kg
          </Text>
          <Text className="text-xs text-text-muted">
            Dimensions: {product?.dimensions.width} x{" "}
            {product?.dimensions.height} x {product?.dimensions.depth} cm
          </Text>
          <Text className="text-xs text-text-muted">
            Tags: {product?.tags.join(", ")}
          </Text>
        </View>

        {/* Policies */}
        <View className="mb-5 bg-white rounded-xl p-4 shadow-sm border border-gray-200 space-y-2">
          <Text className="text-text-primary font-semibold mb-1 text-base">
            Policies
          </Text>
          <Text className="text-xs text-text-muted">
            Warranty: {product?.warrantyInformation}
          </Text>
          <Text className="text-xs text-text-muted">
            Shipping: {product?.shippingInformation}
          </Text>
          <Text className="text-xs text-text-muted">
            Return: {product?.returnPolicy}
          </Text>
        </View>

        {/* Reviews */}
        <View className="mb-5 bg-white rounded-xl p-5 shadow-md border border-gray-300">
          <Text className="text-gray-900 font-bold mb-4 text-lg">
            Customer Reviews
          </Text>
          {product?.reviews.map((review, idx) => (
            <View
              key={idx}
              className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
            >
              <Text
                className="text-md text-gray-700 mb-1"
                style={{ fontWeight: "600" }}
              >
                {review.reviewerName}
              </Text>
              <Text className="text-yellow-500 text-sm mb-2">
                {"⭐".repeat(review.rating)}
              </Text>
              <Text className="text-gray-600 text-sm leading-relaxed">
                {review.comment}
              </Text>
            </View>
          ))}
        </View>

        {/* QR Code */}
        <View className="mb-5 items-center pt-4">
          <Image
            source={{ uri: product?.meta.qrCode }}
            className="w-24 h-24"
            resizeMode="contain"
          />
          <Text className="text-xs text-text-muted mt-1 text-center">
            Scan to verify authenticity
          </Text>
        </View>

        {/* Add to Cart Button */}
        <TouchButton
          label={
            addedQuantity > 0 ? `Added ${addedQuantity} Items` : "Add to Cart"
          }
          textStyle={{ fontWeight: "700" }}
          textColor={colors.white}
          className="bg-primary"
          style={{ borderRadius: 20 }}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        />
      </View>
    </ScrollView>
  ) : (
    <View className="flex-1 items-center justify-center">
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text>No items found.</Text>
        <Text>{error}</Text>
      </View>
    </View>
  );
}
