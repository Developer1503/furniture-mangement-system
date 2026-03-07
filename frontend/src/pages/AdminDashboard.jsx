import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmDeleteType, setConfirmDeleteType] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    bestseller: false,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const { data: usersData, error: usersError } = await supabase.from('users').select('*');
        if (usersError) throw usersError;
        setUsers((usersData || []).map(u => ({ ...u, _id: u.id })));

        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*, users:user_id(name, email)')
          .order('created_at', { ascending: false });
        if (ordersError) throw ordersError;
        setOrders((ordersData || []).map(o => ({
          ...o,
          _id: o.id,
          user: o.users || { name: 'Unknown', email: '' },
          status: o.order_status,
          totalAmount: o.total_price,
          createdAt: o.created_at,
        })));

        // Fetch products
        const { data: productsData, error: productsError } = await supabase.from('products').select('*');
        if (productsError) throw productsError;
        setProducts((productsData || []).map(p => ({ ...p, _id: p.id })));
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data: ' + error.message);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = (userId) => {
    setConfirmDelete(userId);
    setConfirmDeleteType('user');
  };

  const confirmDeleteUser = async () => {
    try {
      const { error } = await supabase.from('users').delete().eq('id', confirmDelete);
      if (error) throw error;
      setUsers(users.filter(user => user._id !== confirmDelete));
      setConfirmDelete(null);
      setConfirmDeleteType(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: status })
        .eq('id', orderId);
      if (error) throw error;
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteProduct = (productId) => {
    setConfirmDelete(productId);
    setConfirmDeleteType('product');
  };

  const confirmDeleteProduct = async () => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', confirmDelete);
      if (error) throw error;
      setProducts(products.filter(product => product._id !== confirmDelete));
      setConfirmDelete(null);
      setConfirmDeleteType(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data, error } = await supabase.from('products').insert([{
        name: newProduct.name,
        description: newProduct.description,
        price: Number(newProduct.price),
        category: newProduct.category,
        bestseller: newProduct.bestseller,
        image: [],
        date: new Date().toISOString(),
      }]).select().single();

      if (error) throw error;

      setProducts([...products, { ...data, _id: data.id }]);
      setNewProduct({ name: '', description: '', price: '', category: '', bestseller: false });
      setMessage('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product: ' + error.message);
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

  const filteredOrders = orders.filter(order => filterStatus === 'all' || order.status === filterStatus);

  // Data for charts
  const orderStatusData = [
    { name: 'Pending', value: orders.filter(order => order.status === 'pending').length },
    { name: 'Shipped', value: orders.filter(order => order.status === 'shipped').length },
    { name: 'Delivered', value: orders.filter(order => order.status === 'delivered').length },
  ];

  const productCategoryData = products.reduce((acc, product) => {
    const category = product.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const productChartData = Object.keys(productCategoryData).map(key => ({
    name: key,
    value: productCategoryData[key],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Summary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderStatusData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Product Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

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
                      Delete
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
                Delete
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
                    <td className="py-2 px-4 border-b">{order._id?.slice(0, 8)}...</td>
                    <td className="py-2 px-4 border-b">{order.user?.name || 'Unknown'}</td>
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
              <input type="text" name="name" value={newProduct.name} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea name="description" value={newProduct.description} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input type="number" name="price" value={newProduct.price} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <input type="text" name="category" value={newProduct.category} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100" required />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Bestseller</label>
              <input type="checkbox" name="bestseller" checked={newProduct.bestseller} onChange={(e) => setNewProduct({ ...newProduct, bestseller: e.target.checked })} className="mr-2" />
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
                  <td className="py-2 px-4 border-b text-center">
                    <button onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                      Delete
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
              <button onClick={() => { setConfirmDelete(null); setConfirmDeleteType(null); }} className="mr-2 text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={confirmDeleteType === 'user' ? confirmDeleteUser : confirmDeleteProduct} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
