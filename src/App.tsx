import { useEffect, useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import Product from "./components/Products";
import Cart from "./components/Cart";
import data from "./data/data.json";


const useDeviceType = () => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");

  const updateDevice = () => {
    const width = window.innerWidth;
    if (width <= 768) setDevice("mobile");
    else if (width <= 1024) setDevice("tablet");
    else setDevice("desktop");
  };

  useEffect(() => {
    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  return device;
};

function App() {
  const device = useDeviceType();

  return (
    <CartProvider>
      <div className="container pt-3 align-items-center main-container">
        <h1 className="mb-4">Desserts</h1>
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex flex-wrap justify-content-center">
              {data.map((item) => (
                <Product
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  img={item.image[device]}
                  thumbnail={item.image.thumbnail}
                />
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
