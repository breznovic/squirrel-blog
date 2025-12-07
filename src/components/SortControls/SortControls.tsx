import { useState, useEffect } from "react";
import s from "./SortControls.module.css";

type SortOption = "newest" | "oldest";

type Props = {
  onSortChange: (sortOption: SortOption) => void;
};

function SortControls({ onSortChange }: Props) {
  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const savedSort = localStorage.getItem("postSortOption") as SortOption;
    return savedSort && ["newest", "oldest"].includes(savedSort)
      ? savedSort
      : "newest";
  });

  useEffect(() => {
    onSortChange(sortOption);
  }, [sortOption, onSortChange]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = event.target.value as SortOption;
    setSortOption(newSortOption);
    localStorage.setItem("postSortOption", newSortOption);
  };

  return (
    <div className={s.controls}>
      <label htmlFor="sort-select" className={s.label}>
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={handleSortChange}
        className={s.select}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}

export default SortControls;
