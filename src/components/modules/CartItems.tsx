import React, { useState } from "react";
import Button from "../elements/Button";

function CartItems() {
  // Example array of products
  const products = [
    {
      id: 1,
      name: "CAT Book",
      price: 19.99,
      quantity: 2,
      image:
        "https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book-1200x1777.jpg",
    },
    {
      id: 2,
      name: "NEET",
      price: 24.99,
      quantity: 1,
      image:
        "https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    },
  ];

  const [quantities, setQuantities] = useState(products.map(() => 1));

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantity;
    setQuantities(newQuantities);
  };

  // Calculate subtotal
  const subtotal = products.reduce(
    (sum, product, index) => sum + product.price * quantities[index],
    0
  );

  return (
    <div style={{ position: "relative", height: "90vh" }}>
      <h1 className="font-bold text-gray-700 text-lg">My Cart</h1>

      {products.map((product, index) => (
        <div
          key={product.id}
          className="my-4 border-b border-gray-300 pb-4 w-[full]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <img
                src={product.image}
                className="w-16 h-16 object-cover mr-4 rounded"
              />
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() =>
                  handleQuantityChange(
                    index,
                    Math.max(1, quantities[index] - 1)
                  )
                }
                className="px-2 py-1 bg-gray-200 text-gray-700 mr-2"
              >
                -
              </button>
              <span className="mx-2">{quantities[index]}</span>
              <button
                onClick={() =>
                  handleQuantityChange(index, quantities[index] + 1)
                }
                className="px-2 py-1 bg-gray-200 text-gray-700 mr-2"
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-2 flex" style={{ justifyContent: "flex-end" }}>
            <button
              className="text-red-600"
              onClick={() => console.log("Remove clicked")}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Subtotal and Checkout Button */}
      <div style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
        <div className="mt-4 border-t border-gray-300 pt-4 flex justify-between items-center">
          <div>
            <span className="font-semibold text-lg">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Button text={"Checkout"} link="/institutes" />
        </div>
      </div>
    </div>
  );
}

export default CartItems;
