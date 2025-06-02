import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  View,
  Text,
  FlatListProps,
} from "react-native";
import RequestController from "../../utils/request-controller";

interface InfinityListProps<T> extends Partial<FlatListProps<T>> {
  url: string;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  keyExtractor?: (item: T, index: number) => string;
  pageSize?: number;

  ListHeaderComponent?: React.ReactElement | React.FC | null;
  ListEmptyComponent?: React.ReactElement | React.FC | null;

  dataKey?: string;
}

function InfinityList<T>({
  url,
  renderItem,
  keyExtractor = (item: any, index: number) => index.toString(),
  pageSize = 10,

  ListHeaderComponent,
  ListEmptyComponent,

  dataKey = "products",
  ...restProps
}: InfinityListProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = (isRefresh: boolean) => {
    const skip = isRefresh ? 0 : page * pageSize;
    const separator = url.includes("?") ? "&" : "?";

    return `${url}${separator}limit=${pageSize}&skip=${skip}`;
  };

  const fetchData = useCallback(
    async (isRefresh = false) => {
      try {
        setError(null);
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        const fullUrl = buildUrl(isRefresh);

        const response = await RequestController.get(fullUrl);

        if (!response.success) throw new Error(response.error);

        const products = response.data?.[dataKey] ?? [];
        const newData = isRefresh ? products : [...data, ...products];
        setData(newData);

        setHasMore(products.length === pageSize);
        setPage(isRefresh ? 1 : page + 1);
      } catch (err: any) {
        console.debug("d----error", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [url, page, pageSize, data]
  );

  useEffect(() => {
    fetchData(true);
  }, [url]);

  const onRefresh = () => fetchData(true);
  const onEndReached = () => {
    if (!loading && hasMore) fetchData(false);
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        error ? (
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={{ color: "red" }}>{error}</Text>
          </View>
        ) : (
          ListEmptyComponent ??
          (!refreshing && (
            <View style={{ padding: 16, alignItems: "center" }}>
              <Text>No items found.</Text>
            </View>
          ))
        )
      }
      ListFooterComponent={
        loading && !refreshing ? (
          <View style={{ padding: 16 }}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      {...restProps}
    />
  );
}

export default InfinityList;
