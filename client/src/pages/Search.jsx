import React from 'react';
import Layout from '../components/Layout/Layout';
import { UseSearch } from '../components/Context/Search';
import './Search.css';

const Search = () => {
  const [values] = UseSearch();

  return (
    <Layout title="Search Results">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? 'No Products Found'
              : `Found ${values?.results.length}`}
          </h6>
        </div>

        <div className="search-results-container">
          {values?.results.map((e) => (
            <div className="search-card" key={e._id}>
              <div className="image-container">
                <img
                  src={`${import.meta.env.VITE_API}/api/v1/product/get-photoproduct/${e._id}`}
                  alt={e.name}
                  onError={(e) =>
                    (e.target.src = 'https://via.placeholder.com/280x200')
                  }
                />
              </div>
              <div className="details-container">
                <h5>{e.name}</h5>
                <p>{e.description.substring(0, 80)}...</p>
                <p><strong>Price:</strong> ₹{e.price}</p>
                <div className="button-group">
                  <button className="btn btn-primary">More Details</button>
                  <button className="btn btn-danger">Add To Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;

