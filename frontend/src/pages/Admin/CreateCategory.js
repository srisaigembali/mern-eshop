import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Forms/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('https://mern-eshop-u016.onrender.com/api/category/create-category', {
      name,
    });
    if (data.success) {
      toast.success(`${name} is created`);
      getAllCategories();
    } else {
      toast.error(data.message);
    }
    try {
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong in category form');
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('https://mern-eshop-u016.onrender.com/api/category/get-categories');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong in getting category');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://mern-eshop-u016.onrender.com/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setVisible(false);
        setUpdatedName('');
        setSelected(null);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong in updating category');
    }
  };

  // delete category
  const handleDelete = async (cid) => {
    try {
      const { data } = await axios.delete(
        `https://mern-eshop-u016.onrender.com/api/category/delete-category/${cid}`
      );
      if (data?.success) {
        toast.success(`category is deleted`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong in updating category');
    }
  };

  return (
    <Layout title={'Dashboard - Create Category'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <h4>Create category</h4>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <>
                      <tr>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-primary me-3"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(category._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <h4>Update category</h4>
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
