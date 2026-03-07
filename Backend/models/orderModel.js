import supabase from '../config/supabase.js';

const orderModel = {
  // Create a new order
  async create(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        user_id: orderData.user,
        products: orderData.products,
        total_price: orderData.totalPrice,
        shipping_address: orderData.shippingAddress,
        payment_method: orderData.paymentMethod,
        payment_status: orderData.paymentStatus,
        order_status: orderData.orderStatus || 'pending',
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return { ...data, _id: data.id };
  },

  // Find all orders (with optional population)
  async find(filter = {}) {
    // Join with users to populate user info
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users:user_id (name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(order => ({
      ...order,
      _id: order.id,
      user: order.users || { name: 'Unknown', email: '' },
      totalPrice: order.total_price,
      shippingAddress: order.shipping_address,
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      orderStatus: order.order_status,
      createdAt: order.created_at,
    }));
  },

  // Find order by ID
  async findById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        users:user_id (name, email)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      data._id = data.id;
      data.user = data.users;
      data.totalPrice = data.total_price;
      data.shippingAddress = data.shipping_address;
      data.paymentMethod = data.payment_method;
      data.paymentStatus = data.payment_status;
      data.orderStatus = data.order_status;
      data.createdAt = data.created_at;
    }

    return data;
  },

  // Find by ID and update
  async findByIdAndUpdate(id, updateData, options = {}) {
    const mapped = {};
    if (updateData.status !== undefined) mapped.order_status = updateData.status;
    if (updateData.orderStatus !== undefined) mapped.order_status = updateData.orderStatus;
    if (updateData.paymentStatus !== undefined) mapped.payment_status = updateData.paymentStatus;

    const { data, error } = await supabase
      .from('orders')
      .update(mapped)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      data._id = data.id;
      data.totalPrice = data.total_price;
      data.orderStatus = data.order_status;
    }
    return data;
  },
};

export default orderModel;
