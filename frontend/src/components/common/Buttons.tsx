import { Edit } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

type CreateButtonProps = {
  url: string;
};

export function CreateButton({ url }: CreateButtonProps) {
  return (
    <>
      <Link
        className="border border-blue-500 bg-blue-500 rounded-xl px-7 py-5 cursor-pointer hover:bg-blue-600"
        to={url}
      >
        <span className="text-white font-semibold">+ Tạo mới</span>
      </Link>
    </>
  );
}

export function EditButton() {
  return (
    <>
      <button>
        <Edit size={18} className="text-gray-600 cursor-pointer" />
      </button>
    </>
  );
}

export function DeleteButton() {
  return (
    <>
      <button>
        <Trash2 size={18} className="text-red-600 cursor-pointer" />
      </button>
    </>
  );
}
