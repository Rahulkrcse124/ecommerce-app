import { Link } from 'react-router-dom';
import useCategory from '../components/Hooks/useCategory';
import Layout from '../components/Layout/Layout';
import './Categories.css';

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories - Ecommerce App">
      <div className="categories-container">
        <h1 className="categories-title">
          <i className="bi bi-grid me-2"></i>All Category List
        </h1>
        <div className="category-grid">
          {categories.map((e) => (
            <Link key={e._id} to={`/category/${e.slug}`} className="category-card">
              <span>{e.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
