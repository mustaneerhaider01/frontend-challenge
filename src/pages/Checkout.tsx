import CheckoutItem from "../components/Products/CheckoutItem";
import Heading from "../components/UI/Heading";
import useBasketStore from "../store/useBasketStore";

function Checkout() {
  const basketItems = useBasketStore((state) => state.items);

  if (!basketItems.length) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Heading
          center
          title="Your basket is empty!"
          subtitle="Browse items now and add them to your basket"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-5 sm:mx-auto ">
      <h1 className="text-neutral-800 mb-6 text-3xl font-bold">Your Basket</h1>
      <div className="flex flex-col gap-5">
        {basketItems.map((item) => (
          <CheckoutItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Checkout;
