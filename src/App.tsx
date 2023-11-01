import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import Home from "./pages/Home";
import ProductListings from "./pages/ProductListings";
import { Toaster } from "react-hot-toast";
import AddProduct from "./pages/AddProduct";
import Checkout from "./pages/Checkout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/items" element={<ProductListings />} />
          <Route path="/add-items" element={<AddProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </>
    )
  );

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
