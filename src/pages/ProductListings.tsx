import { useQuery } from "react-query";
import newRequest from "../lib/newRequest";
import { ProductItem } from "../types";
import ProductCard from "../components/Products/ProductCard";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Input from "../components/UI/Input";

function ProductListings() {
  const [searchValue, setSearchValue] = useState("");

  const {
    data: items,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const data: ProductItem[] = await newRequest
        .get("/items")
        .then((res) => res.data);
      return data;
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong while loading the items!");
    }
  }, [isError]);

  const _renderSkeletons = useCallback(() => {
    return [...Array(10)].map((_, i) => (
      <div className="col-span-1" key={i}>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton height={250} width="100%" className="rounded-xl" />
          <Skeleton width={100} />
          <Skeleton width={50} />
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </div>
    ));
  }, []);

  return (
    <main className="max-w-screen-2xl mx-5 2xl:mx-auto">
      {/* Search */}
      <div className="mb-14 flex flex-col gap-2">
        <h2 className="text-neutral-800 font-bold text-3xl">Search</h2>
        <Input
          allowInputBorder={false}
          placeholder="What do you want to buy?"
          disabled={isLoading}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Product Listings */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
        {isLoading
          ? _renderSkeletons()
          : items
              ?.filter((item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              ?.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>
    </main>
  );
}

export default ProductListings;
