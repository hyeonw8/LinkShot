interface FilterUIProps {
  categories: string[];
  selectedCategory: string;
  sortOrder: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Filter = ({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
}: FilterUIProps) => {
  return (
    <div className="flex justify-between items-center mb-2 bg-green-200 p-4 rounded-lg shadow-sm">
      <div className="flex gap-3">
        <select
          value={selectedCategory}
          onChange={onCategoryChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={onSortChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="newest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>
    </div>
  );
};