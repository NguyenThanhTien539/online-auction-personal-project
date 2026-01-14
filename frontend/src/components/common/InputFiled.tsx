interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}

export function InputField({
  label,
  id,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  );
}
