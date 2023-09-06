const SelectInput = ({
  value,
  setValue,
  options,
  label,
  className,
}: {
  value: string;
  setValue: (value: string) => void;
  options: string[];
  label: string;
  className: string;
}) => {
  return (
    <div className={`flex flex-row items-center ${className}`}>
      <label htmlFor="sort-options" className="text-white font-bold text-lg">
        {label}
      </label>
      <select
        id="sort-options"
        className="flex-1 p-2.5 rounded-md w-full text-sm focus-visible:outline-none border-none"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
