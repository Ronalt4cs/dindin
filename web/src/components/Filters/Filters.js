import './styles.css'
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage'
import api from '../../services/api'

export default function Filters() {
  const token = getItem('token');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  async function getCategories() {
    const { data } = await api.get("/categoria", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCategories(data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  function handleCategoryClick(categoryId) {
    setSelectedCategory(categoryId);
  }

  return (
    <div className='container-filters'>
      <h1>Categorias</h1>
      <div className='container-btns-category'>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="btn-category"
          >
            {category.descricao}
          </button>
        ))}
      </div>
      <button
        className='btn-clear-filter'
        style={{ backgroundColor: '#FAFAFA' }}
      >
        Limpar Filtros
      </button>
      <button
        className='btn-aply-filter btn-purple'
      >
        Aplicar Filtros
      </button>
    </div>
  )
}
