import CategoryList from "@/views/admin/pages/CategoryList";
import CategoryCreate from "@/views/admin/pages/CategoryCreate";

const categoryRoute = {
  path: "categories",
  children: [
    {
      index: true,
      element: <CategoryList />,
    },
    {
      path: "create",
      element: <CategoryCreate />,
    },
  ],
};

export default categoryRoute;
