import supabase from '../config/supabase.js';

const productModel = {
  // Create a new product
  async create(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        category: productData.category,
        bestseller: productData.bestseller || false,
        date: productData.date ? new Date(productData.date).toISOString() : new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return { ...data, _id: data.id };
  },

  // Save a product (alias for create)
  async save(productData) {
    return this.create(productData);
  },

  // Find all products (with optional filter)
  async find(filter = {}) {
    let query = supabase.from('products').select('*');

    if (filter.category) query = query.eq('category', filter.category);
    if (filter.bestseller !== undefined) query = query.eq('bestseller', filter.bestseller);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;

    return (data || []).map(product => ({
      ...product,
      _id: product.id,
    }));
  },

  // Find product by ID
  async findById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (data) data._id = data.id;
    return data;
  },

  // Find by ID and update
  async findByIdAndUpdate(id, updateData, options = {}) {
    const mapped = {};
    if (updateData.name !== undefined) mapped.name = updateData.name;
    if (updateData.description !== undefined) mapped.description = updateData.description;
    if (updateData.price !== undefined) mapped.price = updateData.price;
    if (updateData.image !== undefined) mapped.image = updateData.image;
    if (updateData.category !== undefined) mapped.category = updateData.category;
    if (updateData.bestseller !== undefined) mapped.bestseller = updateData.bestseller;

    const { data, error } = await supabase
      .from('products')
      .update(mapped)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) data._id = data.id;
    return data;
  },

  // Find by ID and delete
  async findByIdAndDelete(id) {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) data._id = data.id;
    return data;
  },

  // Search products by name or description (replaces MongoDB $regex)
  async search(queryStr) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${queryStr}%,description.ilike.%${queryStr}%`);

    if (error) throw error;
    return (data || []).map(product => ({
      ...product,
      _id: product.id,
    }));
  },
};

export default productModel;
