import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartItem } from "../../types";
import useBasketStore from "../../store/useBasketStore";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  data: CartItem;
};

function CheckoutItem({ data }: Props) {
  const [addItemQty, removeItemQty, deleteItem] = useBasketStore((state) => [
    state.addItemQuantity,
    state.removeItemQuantity,
    state.deleteItem,
  ]);

  return (
    <div className="relative border border-kfield p-3 rounded-xl flex gap-5 shadow">
      <img
        src={
          data.image.startsWith("/img")
            ? `${import.meta.env.VITE_API_BASE_URL}${data.image}`
            : data.image
        }
        alt="Item"
        className="h-32 w-32 rounded-xl object-cover"
      />

      <div className="flex-1 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-neutral-800">{data.name}</h2>

        <h3 className="text-neutral-500 flex-1">
          $ {data.price.toLocaleString()}
        </h3>

        <div className="flex items-center gap-4">
          <div
            onClick={() => removeItemQty(data.id)}
            className="w-6 h-6 rounded-full border border-neutral-400 flex items-center justify-center 
          text-neutral-600 cursor-pointer hover:opacity-80 transition"
          >
            <AiOutlineMinus />
          </div>

          <p className="text-xl font-light text-neutral-600">{data.quantity}</p>

          <div
            onClick={() => addItemQty(data)}
            className="w-6 h-6 rounded-full border border-neutral-400 flex items-center justify-center 
          text-neutral-600 cursor-pointer hover:opacity-80 transition"
          >
            <AiOutlinePlus />
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteItem(data.id)}
        className="absolute top-3 right-3"
      >
        <FiTrash2
          size={20}
          className="text-neutral-800 hover:text-error transition"
        />
      </button>
    </div>
  );
}

export default CheckoutItem;
