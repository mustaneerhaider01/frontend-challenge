import { useCallback, useMemo } from "react";
import useBasketStore from "../../store/useBasketStore";
import { CartItem, ProductItem } from "../../types";
import Button from "../UI/Button";

type Props = {
  item: ProductItem;
};

function ProductCard({ item }: Props) {
  const basketStore = useBasketStore();

  const handleAddToCart = useCallback(() => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      image: item.img,
      price: Number(item.price),
      quantity: 1,
    };

    basketStore.addItemQuantity(cartItem);
  }, [item, basketStore]);

  const isItemInBasket = useMemo(
    () => !!basketStore.items.find((bItem) => bItem.id === item.id),
    [basketStore, item.id]
  );

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full aspect-square rounded-xl overflow-hidden">
          <img
            src={
              item.img.startsWith("/img")
                ? `${import.meta.env.VITE_API_BASE_URL}${item.img}`
                : item.img
            }
            alt="Product"
            className="h-full w-full object-cover group-hover:scale-110 transition"
          />
        </div>

        <p className="font-semibold">{item.name}</p>

        <p className="text-neutral-500">
          $ {parseInt(item.price, 10).toLocaleString()}
        </p>

        {isItemInBasket ? (
          <Button disabled label="Item added to basket" outline small />
        ) : (
          <Button small label="Add to Cart" onClick={handleAddToCart} />
        )}
      </div>
    </div>
  );
}

export default ProductCard;
