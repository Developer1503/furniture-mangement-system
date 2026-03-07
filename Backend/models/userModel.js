import supabase from '../config/supabase.js';
import bcrypt from 'bcrypt';

const UserRoles = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest',
};

// Helper functions that mimic the Mongoose model interface using Supabase

const userModel = {
  // Create a new user
  async create(userData) {
    // Hash password before saving
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || null,
        profile_picture: userData.profilePicture || null,
        username: userData.username || null,
        role: userData.role || UserRoles.CUSTOMER,
        google_id: userData.googleId || null,
        shipping_address: userData.shippingAddress || null,
        billing_address: userData.billingAddress || null,
        cart_data: userData.cartData || {},
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Find one user by filter
  async findOne(filter) {
    let query = supabase.from('users').select('*');

    if (filter.email) query = query.eq('email', filter.email);
    if (filter.username) query = query.eq('username', filter.username);
    if (filter.googleId) query = query.eq('google_id', filter.googleId);

    const { data, error } = await query.maybeSingle();
    if (error) throw error;

    if (data) {
      // Add helper method to match password
      data.matchPassword = async (enteredPassword) => {
        return await bcrypt.compare(enteredPassword, data.password);
      };
      // Map snake_case to camelCase for compatibility
      data._id = data.id;
      data.profilePicture = data.profile_picture;
      data.lastLogin = data.last_login;
      data.shippingAddress = data.shipping_address;
      data.billingAddress = data.billing_address;
      data.cartData = data.cart_data;
      data.createdAt = data.created_at;
      data.googleId = data.google_id;
    }

    return data;
  },

  // Find user by ID
  async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (data) {
      data.matchPassword = async (enteredPassword) => {
        return await bcrypt.compare(enteredPassword, data.password);
      };
      data._id = data.id;
      data.profilePicture = data.profile_picture;
      data.lastLogin = data.last_login;
      data.shippingAddress = data.shipping_address;
      data.billingAddress = data.billing_address;
      data.cartData = data.cart_data;
      data.createdAt = data.created_at;
      data.googleId = data.google_id;
    }

    return data;
  },

  // Find all users
  async find(filter = {}) {
    let query = supabase.from('users').select('*');

    // Apply filters as needed
    if (filter.role) query = query.eq('role', filter.role);

    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map(user => ({
      ...user,
      _id: user.id,
      profilePicture: user.profile_picture,
      lastLogin: user.last_login,
      shippingAddress: user.shipping_address,
      billingAddress: user.billing_address,
      cartData: user.cart_data,
      createdAt: user.created_at,
      googleId: user.google_id,
    }));
  },

  // Find by ID and update
  async findByIdAndUpdate(id, updateData, options = {}) {
    // Map camelCase to snake_case
    const mapped = {};
    if (updateData.name !== undefined) mapped.name = updateData.name;
    if (updateData.email !== undefined) mapped.email = updateData.email;
    if (updateData.phone !== undefined) mapped.phone = updateData.phone;
    if (updateData.location !== undefined) mapped.location = updateData.location;
    if (updateData.language !== undefined) mapped.language = updateData.language;
    if (updateData.profilePicture !== undefined) mapped.profile_picture = updateData.profilePicture;
    if (updateData.role !== undefined) mapped.role = updateData.role;
    if (updateData.lastLogin !== undefined) mapped.last_login = updateData.lastLogin;
    if (updateData.password !== undefined) mapped.password = updateData.password;
    if (updateData.cartData !== undefined) mapped.cart_data = updateData.cartData;

    const { data, error } = await supabase
      .from('users')
      .update(mapped)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (data) {
      data._id = data.id;
      data.profilePicture = data.profile_picture;
      data.lastLogin = data.last_login;
      data.shippingAddress = data.shipping_address;
      data.billingAddress = data.billing_address;
      data.cartData = data.cart_data;
      data.createdAt = data.created_at;
    }

    return data;
  },

  // Find by ID and delete
  async findByIdAndDelete(id) {
    const { data, error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export { UserRoles };
export default userModel;
