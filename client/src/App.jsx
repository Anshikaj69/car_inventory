import React, { useState, useEffect } from 'react';

const App = () => {
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    // Fetch data from backend API endpoint
    await fetch('https://car-inventory-5yoi.onrender.com/api/cars')
      .then(response => response.json())
      .then(data => {
        setCarsData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePurchase = async (carId) => {
    try {
      await fetch(`https://car-inventory-5yoi.onrender.com/api/cars/purchase/${carId}`, {
        method: 'PUT',
      });
      fetchData(); // Refresh data after purchase
    } catch (error) {
      console.error('Error purchasing car:', error);
    }
  };

  const handleSell = async (carId) => {
    try {
      await fetch(`https://car-inventory-5yoi.onrender.com/api/cars/sell/${carId}`, {
        method: 'PUT',
      });
      fetchData(); // Refresh data after sell
    } catch (error) {
      console.error('Error selling car:', error);
    }
  };

  return (
    <div className="flex justify-center items-center w-[100vw] ">
    <div className='flex flex-col gap-11 justify-center w-[90%]  my-10'>
      <div className='gap-2'>
      <h1 className='text-center font-bold'>Car Inventory</h1>
      <p className='text-center'> Due to limitations of live server, requests get delayed. Please refresh to see changes. works fine on local env</p>
      </div>
      <table className='table-auto '>
        <thead className='border'>
          <tr className='bg-slate-300 border rounded'>
            <th className='border-r border-slate-100 py-1 px-2'>Car ID</th>
            <th className='border-r border-slate-100 py-1 px-2'>Model</th>
            <th className='border-r border-slate-100 py-1 px-2'>Stock Count</th>
            <th className='border-r border-slate-100 py-1 px-2'>Purchase Quantity</th>
            <th className='border-r border-slate-100 py-1 px-2'>Unit Purchase Price</th>
            <th className='border-r border-slate-100 py-1 px-2'>Total Purchase Value</th>
            <th className='border-r border-slate-100 py-1 px-2'>Sales Quantity</th>
            <th className='border-r border-slate-100 py-1 px-2'>Unit Sales Price</th>
            <th className='border-r border-slate-100 py-1 px-2'>Total Sales Value</th>
            <th className='border-r border-slate-100 py-1 px-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carsData.map(car => (
            <tr key={car.car_id}>
              <td className='border border-slate-300 py-1 px-2'>{car.car_id}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.model}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.stock_count}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.purchase_quantity}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.unit_purchase_price}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.total_purchase_value}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.sales_quantity}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.unit_sales_price}</td>
              <td className='border border-slate-300 py-1 px-2'>{car.total_sales_value}</td>
              <td className='border border-slate-300 py-1 px-2'>
                <button className='bg-[#007bff] text-white m-1' onClick={() => handlePurchase(car.car_id)}>Purchase</button>
                <button className='bg-[#28a745] text-white m-1' onClick={() => handleSell(car.car_id)}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default App;

