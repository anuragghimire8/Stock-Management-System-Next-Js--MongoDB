"use client"

import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const { products } = await response.json();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        console.log('Product added successfully');
        setAlert('Your Product has been added');
        setProductForm({});
      } else {
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <div className='container my-6 bg-blue-500 p-8'>
        <div className='text-black-800 text-center font-bold'>{alert}</div>
        <h1 className='text-3xl font-bold mt-8 mb-4'>Search a Product</h1>
        <div className='flex items-center space-x-4'>
          <input
            type='text'
            className='border border-gray-300 rounded-md py-2 px-3 text-lg'
            placeholder='Search for a product'
          />
          <select className='border border-gray-300 rounded-md py-2 px-3 text-lg'>
            <option value=''>Select Category</option>
            <option value='electronics'>Electronics</option>
            <option value='clothing'>Clothing</option>
            <option value='books'>Books</option>
          </select>
        </div>
      </div>

      <div className='container bg-blue-50 p-8'>
        <h1 className='text-3xl font-bold mb-8'>Add a Product</h1>
        <form className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='productName' className='text-lg mb-2'>
              Product Slug:
            </label>
            <input
              onChange={handleChange}
              value={productForm.slug || ''}
              type='text'
              name='slug'
              id='productName'
              className='border border-gray-300 rounded-md py-2 px-3 text-lg'
              placeholder='Enter product name'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='quantity' className='text-lg mb-2'>
              Quantity:
            </label>
            <input
              value={productForm.quantity || ''}
              type='number'
              name='quantity'
              onChange={handleChange}
              id='quantity'
              className='border border-gray-300 rounded-md py-2 px-3 text-lg'
              placeholder='Enter quantity'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='price' className='text-lg mb-2'>
              Price:
            </label>
            <input
              value={productForm.price || ''}
              name='price'
              onChange={handleChange}
              type='number'
              id='price'
              className='border border-gray-300 rounded-md py-2 px-3 text-lg'
              placeholder='Enter price'
            />
          </div>
          <button
            onClick={addProduct}
            type='submit'
            className='bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600'
          >
            Add Product
          </button>
        </form>
      </div>

      <div className='container my-6 bg-green-50 p-8'>
        <h1 className='text-3xl font-bold mt-8'>Display Current Stock</h1>
        <table className='w-full mt-4'>
          <thead>
            <tr>
              <th className='text-left text-lg'>Product Name</th>
              <th className='text-left text-lg'>Quantity</th>
              <th className='text-left text-lg'>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}> 
                <td className='py-2 px-4'>{product.slug}</td>
                <td className='py-2 px-4'>{product.quantity}</td>
                <td className='py-2 px-4'>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
