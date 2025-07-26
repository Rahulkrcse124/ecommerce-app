import {useEffect,useState} from 'react';
import axios from 'axios'

export default function useCategory(){
  const[categories,setCategories] = useState([]);

  // get cat
  const getCategories = async()=> {
    try {
      const{data} = await axios.get(`${import.meta.env.VITE_API}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getCategories();
  },[])

  return categories
}