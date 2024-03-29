import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminMenu from '../../components/AdminMenu';
import Layout from '../../components/Layout';
import moment from 'moment';
import { Select } from 'antd';
import { useAuth } from '../../context/Auth';
const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    'Not Processed',
    'Processing',
    'Shipped',
    'delivered',
    'cancelled',
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get('https://mern-eshop-u016.onrender.com/api/auth/all-orders');
      setOrders(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`https://mern-eshop-u016.onrender.com/api/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <Layout title={'All Orders Data'}>
      <div className=" container-fluid m-3 p-3 ">
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow mb-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-3">
                          <img
                            src={`https://mern-eshop-u016.onrender.com/api/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height={'200px'}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
