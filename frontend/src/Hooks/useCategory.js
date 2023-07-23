import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://mern-eshop-u016.onrender.com/api/category/get-categories"
      );
      setCategories(data?.category);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
