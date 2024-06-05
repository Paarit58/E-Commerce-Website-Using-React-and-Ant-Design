export const getAllProducts = async () => {
  const res = await fetch("https://dummyjson.com/products");
  return await res.json();
};

export const addToCart = async (id) => {
  const res = await fetch("https://dummyjson.com/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    }),
  });
  return await res.json();
};

export const getProductsByCategory = async (categoryId) => {
  return fetch(`https://dummyjson.com/products/category/${categoryId}`).then(
    (res) => res.json()
  );
};
export const getCart = async () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};
