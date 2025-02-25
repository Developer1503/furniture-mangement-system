// Frontend/src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    bestseller: false,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const usersResponse = await axios.get('http://localhost:4000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersResponse = await axios.get('http://localhost:4000/api/admin/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsResponse = await axios.get('http://localhost:4000/api/admin/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersResponse.data);
        setOrders(ordersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data. Please check your credentials.');
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    setConfirmDelete(userId);
  };

  const confirmDeleteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/admin/users/${confirmDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user._id !== confirmDelete));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/admin/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setConfirmDelete(productId);
  };

  const confirmDeleteProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4000/api/admin/products/${confirmDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter(product => product._id !== confirmDelete));
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('bestseller', newProduct.bestseller);
      if (newProduct.image1) formData.append('image1', newProduct.image1);
      if (newProduct.image2) formData.append('image2', newProduct.image2);
      if (newProduct.image3) formData.append('image3', newProduct.image3);
      if (newProduct.image4) formData.append('image4', newProduct.image4);

      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/api/admin/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: '', category: '', bestseller: false, image1: null, image2: null, image3: null, image4: null });
      setMessage('Product added successfully');
    } catch (error) {
      setMessage('Error adding product: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, imageKey) => {
    const file = e.target.files[0];
    setNewProduct((prevData) => ({
      ...prevData,
      [imageKey]: file,
    }));
  };

  const filteredOrders = orders.filter(order => filterStatus === 'all' || order.status === filterStatus);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Users Section */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Users</h2>
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                      <span className="material-icons">delete</span> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden grid grid-cols-1 gap-4">
          {users.map(user => (
            <div key={user._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">{user.name}</h3>
              <p className="text-gray-700 mb-2">{user.email}</p>
              <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                <span className="material-icons">delete</span> Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Orders</h2>
        <div className="mb-4">
          <label className="mr-2">Filter by Status:</label>
          <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
            <option value="all">Show All</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Order ID</th>
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={order._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-4 border-b">{order._id}</td>
                    <td className="py-2 px-4 border-b">{order.user.name}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`badge ${order.status === 'pending' ? 'bg-yellow-500' : order.status === 'shipped' ? 'bg-blue-500' : 'bg-green-500'} text-white px-2 py-1 rounded`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">${order.totalAmount}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <select onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)} value={order.status}>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No orders available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products Section */}
      <div className="p-4 bg-white rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Products</h2>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="mb-4">
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Bestseller</label>
              <input
                type="checkbox"
                name="bestseller"
                checked={newProduct.bestseller}
                onChange={(e) => setNewProduct({ ...newProduct, bestseller: e.target.checked })}
                className="mr-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Images</label>
              <input
                type="file"
                name="image1"
                onChange={(e) => handleFileChange(e, 'image1')}
                className="w-full p-2 border rounded bg-gray-100 mb-2"
              />
              <input
                type="file"
                name="image2"
                onChange={(e) => handleFileChange(e, 'image2')}
                className="w-full p-2 border rounded bg-gray-100 mb-2"
              />
              <input
                type="file"
                name="image3"
                onChange={(e) => handleFileChange(e, 'image3')}
                className="w-full p-2 border rounded bg-gray-100 mb-2"
              />
              <input
                type="file"
                name="image4"
                onChange={(e) => handleFileChange(e, 'image4')}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
          {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={product.image[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                      <span className="material-icons">delete</span> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-end">
              <button onClick={() => setConfirmDelete(null)} className="mr-2 text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={confirmDeleteUser} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
