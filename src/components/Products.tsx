import React from "react";
import { ButtonAdd } from "./ButtonAdd";

interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  thumbnail: string;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  category,
  price,
  img,
  thumbnail,
}) => {
  return (
    <div className="d-flex flex-column align-items-center m-2" style={{ width: "16rem" }}>
      <div style={{ position: "relative" }}>
        <img
          src={img}
          alt={name}
          className="border"
          style={{ width: "16rem", borderRadius: "10px", objectFit: "cover" }}
        />
        <ButtonAdd
          id={id}
          name={name}
          category={category}
          price={price}
          thumbnail={thumbnail}
        />
      </div>
      <div className="mt-4 text-start w-100" style={{ maxWidth: "16rem" }}>
        <div>{category}</div>
        <div>
          <div>{name}</div>
        </div>
        <p className="text-danger">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Product;