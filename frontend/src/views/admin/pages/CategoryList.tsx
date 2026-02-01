import FilterBar from "@/components/admin/FilterBar";

export default function CategoryList() {
  return (
    <div className="w-full space-y-6">
      <h1 className="font-medium text-3xl">Quản lý danh mục</h1>
      <FilterBar />
      {/* <ActionBar /> */}
    </div>
  );
}
