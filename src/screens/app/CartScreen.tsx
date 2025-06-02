import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import colors from "../../constants/colors";
import Header from "../../components/ui/Header";
import { CartItem, useCart } from "../../hooks/cart";

export default function CartScreen({ navigation }) {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from the cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => clearCart() },
      ]
    );
  };

  const changeQuantity = (item: CartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      Alert.alert("Remove Item", `Remove ${item.title} from the cart?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => removeFromCart(item.productId),
          style: "destructive",
        },
      ]);
    } else {
      updateQuantity(item.productId, newQty);
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        alignItems: "center",
        backgroundColor: colors.backgroundLight,
      }}
    >
      <Image
        source={{ uri: item?.thumbnail }}
        style={{ width: 80, height: 80, borderRadius: 8, marginRight: 12 }}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.textPrimary,
            marginBottom: 4,
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 14 }}>
          ${item.price.toFixed(2)}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            alignItems: "center",
            gap: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => changeQuantity(item, -1)}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>−</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              minWidth: 24,
              textAlign: "center",
            }}
          >
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={() => changeQuantity(item, 1)}
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 4,
              paddingHorizontal: 10,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeFromCart(item.productId)}
            style={{ marginLeft: "auto" }}
          >
            <Text
              style={{ color: colors.error, fontWeight: "600", fontSize: 14 }}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (!items) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.backgroundLight,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundLight }}>
      <Header
        heading="Your Cart"
        onBackPress={() => navigation.goBack()}
        rightComponent={
          items.length > 0 ? (
            <TouchableOpacity onPress={handleClearCart}>
              <Text
                style={{
                  color: colors.error,
                  fontWeight: "700",
                  fontSize: 14,
                  paddingRight: 16,
                }}
              >
                Clear All
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />

      {items.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.textMuted, fontSize: 18 }}>
            Your cart is empty.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.productId}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 120 }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: colors.white,
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: colors.textPrimary,
              }}
            >
              Total:
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: colors.primary,
              }}
            >
              ${totalPrice.toFixed(2)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
