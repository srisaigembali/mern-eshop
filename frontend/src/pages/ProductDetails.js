import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/product/similar-products/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-5">
          <img
            src={`/api/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={'500px'}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {product.category?.name}</h6>
          <button className="btn btn-secondary mt-2">Add to cart</button>
        </div>
      </div>
      <hr />
      <div className="row">
        <h1>Similar Products</h1>
        {similarProducts.length < 1 && (
          <p className="text-center">No similar products found.</p>
        )}
        {similarProducts?.map((p) => (
          <div className="card m-2" style={{ width: '18rem' }}>
            <img
              src={`/api/product/product-photo/${p._id}`}
              className="card-img-top"
              alt={p.name}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
              <p className="card-text">{p.description.substring(0, 30)}...</p>
              <p className="card-text">$ {p.price}</p>
              <button className="btn btn-secondary ms-1">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
