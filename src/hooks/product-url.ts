import { useMemo } from "react";
import APIRoutes from "../constants/api_routes";

type ProductQueryOptions = {
  id?: number;
  search?: string;
  category?: string;
  limit?: number;
  skip?: number;
  select?: string[];
};

export function useProductQueryUrl(options: ProductQueryOptions = {}) {
  const { id, search, category, limit, skip, select } = options;

  const base = APIRoutes.products;

  const handleUrlGeneration = () => {
    if (id !== undefined) {
      return `${base}/${id}`;
    }

    let endpoint = base;
    const params = new URLSearchParams();

    if (search) {
      endpoint += "/search";
      params.append("q", search);
    } else if (category) {
      endpoint += `/category/${encodeURIComponent(category)}`;
    }

    if (limit !== undefined) params.append("limit", limit.toString());
    if (skip !== undefined) params.append("skip", skip.toString());
    if (select && select.length > 0) {
      params.append("select", select.join(","));
    }

    return params.toString() ? `${endpoint}?${params}` : endpoint;
  };
  const url = useMemo(handleUrlGeneration, [
    id,
    search,
    category,
    limit,
    skip,
    select,
  ]);

  return url;
}
