import React from "react";
import { UseSearch } from "../Context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = UseSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex align-items-center gap-2 flex-grow-1"
      role="search"
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <input
        className="form-control"
        type="search"
        placeholder="Search products..."
        aria-label="Search"
        value={values.keyword}
        onChange={(e) =>
          setValues({ ...values, keyword: e.target.value })
        }
        style={{
          borderRadius: "20px",
          padding: "0.5rem 1rem",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
        }}
      />
      <button
        className="btn btn-success"
        type="submit"
        style={{
          borderRadius: "20px",
          padding: "0.5rem 1.2rem",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;