// hooks/useApi.ts
import { useCallback } from "react";
import RequestController from "../utils/request-controller";
import APIRoutes from "../constants/api_routes";
import { useAppDispatch } from "../redux/store";
import { setUser } from "../redux/slices/user";
import * as SecureStore from "expo-secure-store";
import BaseKeys from "../constants/base_keys";

const useApi = () => {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    try {
      const response = await RequestController.get(APIRoutes.me);

      if (response.success && response.data) {
        await SecureStore.setItemAsync(
          BaseKeys.USER,
          JSON.stringify(response.data)
        );
        dispatch(setUser(response.data));
      } else {
        console.warn("Failed to fetch user:", response.error);
      }
    } catch (error) {
      console.error("getUser failed:", error);
    }
  };

  const getProductDetails = async (id: number) => {
    try {
      const response = await RequestController.get(
        `${APIRoutes.products}/${id}`
      );
      if (response.success && response.data) {
        return response.data;
      } else {
        console.warn("Failed to fetch product:", response.error);
      }
    } catch (error) {
      console.error("getProductDetails failed:", error);
    }
  };

  return {
    getUser,
    getProductDetails,
  };
};

export default useApi;
