import ProductList from "@/views/admin/pages/ProductList";

const productRoute = {
  path: "products",
  children: [
    {
      index: true,
      element: <ProductList />,
    },
  ],
};

export default productRoute;
