import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../../features/threads/threadsSlice';

function ThreadFilter() {
  const dispatch = useDispatch();
  const { list, categoryFilter } = useSelector((state) => state.threads);

  const categories = Array.from(
    new Set(list.map((thread) => thread.category).filter(Boolean)),
  );

  const handleChange = (event) => {
    dispatch(setCategoryFilter(event.target.value));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor="category-filter"
        style={{ marginRight: '0.5rem', fontWeight: 'bold' }}
      >
        Filter Kategori:
      </label>

      <select
        id="category-filter"
        value={categoryFilter}
        onChange={handleChange}
      >
        <option value="all">Semua</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThreadFilter;
