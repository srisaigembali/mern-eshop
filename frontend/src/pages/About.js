import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout title={"About Us - EShop App"}>
      <div className='row contactus '>
        <div className='col-md-6 '>
          <img
            src='/images/about.jpeg'
            alt='contactus'
            style={{ width: "100%" }}
          />
        </div>
        <div className='col-md-4'>
          <p className='text-justify mt-2'>
            EShop is an ecommerce platform where you can buy products at the
            best prices. You can filter the products with categories, prices,
            etc. User can track his orders in the dashboard section. Admin can
            add, update, create products for users. Happy Shopping :)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
