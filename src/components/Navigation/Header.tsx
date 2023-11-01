import { AiOutlineShoppingCart } from "react-icons/ai";
import NavigationLink from "./NavigationLink";
import { useNavigate } from "react-router-dom";
import useBasketStore from "../../store/useBasketStore";

function Header() {
  const navigate = useNavigate();
  const basketItems = useBasketStore((state) => state.items);

  return (
    <header className="sticky top-0 z-50 p-5 bg-blue-500 shadow-sm">
      <div className="max-w-screen-2xl mx-auto flex gap-4 flex-col md:flex-row items-center justify-between">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl text-blue-100 cursor-pointer"
        >
          RandoStore
        </h1>

        <div className="flex items-center gap-7">
          <NavigationLink href="/add-items">
            Put Items up for Sale
          </NavigationLink>
          <NavigationLink href="/items">Browse our Items!</NavigationLink>
          <NavigationLink href="/checkout">Checkout</NavigationLink>

          <div
            onClick={() => navigate("/checkout")}
            className="relative cursor-pointer"
          >
            <AiOutlineShoppingCart
              size={24}
              className="text-blue-100 hover:text-white"
            />
            <div
              className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-red-500 text-[10px] 
            flex items-center justify-center text-white"
            >
              {basketItems.length}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
