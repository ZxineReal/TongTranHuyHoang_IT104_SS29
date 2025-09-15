import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getAllProduct = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/product");

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center">
        <HashLoader />;
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Danh sách sản phẩm
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.product_name}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">
              {product.product_name}
            </h3>
            <p className="text-red-500 font-medium mb-1">
              Giá: {product.price.toLocaleString()} đ
            </p>
            <p className="text-gray-600 mb-1">Số lượng: {product.quantity}</p>
            <span className="text-xs text-gray-400 mt-auto">
              Ngày thêm: {new Date(product.created_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
