import { ClassAttributes } from "react";

interface SelectProps {
  options: {
    key: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
  label: string;
  className?: string;
}

export const Select = ({ options, onSelect, label, ...props }: SelectProps) => {
  return (
    <div className={props?.className}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <select
        onChange={(e) => {
          onSelect(e.target.value);
        }}
        className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus: border-blue-500 block w-full p-2.5"
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </div>
  );
};
