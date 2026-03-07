import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    bestseller: false,
    image: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', icon: '💻', color: 'from-blue-500 to-cyan-500' },
    { name: 'Clothing', icon: '👕', color: 'from-purple-500 to-pink-500' },
    { name: 'Home & Garden', icon: '🏡', color: 'from-green-500 to-emerald-500' },
    { name: 'Sports', icon: '⚽', color: 'from-orange-500 to-red-500' },
    { name: 'Books', icon: '📚', color: 'from-yellow-500 to-amber-500' },
    { name: 'Toys', icon: '🎮', color: 'from-indigo-500 to-purple-500' },
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (value.length < 3) {
          newErrors.name = 'Name must be at least 3 characters';
        } else {
          delete newErrors.name;
        }
        break;
      case 'price':
        if (value <= 0) {
          newErrors.price = 'Price must be greater than 0';
        } else {
          delete newErrors.price;
        }
        break;
      case 'description':
        if (value.length < 10) {
          newErrors.description = 'Description must be at least 10 characters';
        } else {
          delete newErrors.description;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleImageChange = (files) => {
    const fileArray = Array.from(files);
    setProduct({
      ...product,
      image: fileArray,
    });

    // Create preview URLs
    const previews = fileArray.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleImageChange(files);
  };

  const removeImage = (index) => {
    const newImages = product.image.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setProduct({ ...product, image: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload images to Supabase Storage if available
      let imageUrls = [];
      for (const file of product.image) {
        const fileExt = file.name.split('.').pop();
        const fileName = `products/${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (!error) {
          const { data: { publicUrl } } = supabase.storage
            .from('product-images')
            .getPublicUrl(fileName);
          imageUrls.push(publicUrl);
        }
      }

      const { error } = await supabase.from('products').insert([{
        name: product.name,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        bestseller: product.bestseller,
        image: imageUrls.length > 0 ? imageUrls : [],
        date: new Date().toISOString(),
      }]);

      if (error) throw error;

      setShowSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (error) {
      console.error('Error adding product:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">Create an amazing product listing</p>
        </div>

        {/* Success Animation */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 text-center transform animate-bounce-in">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-green-600">Product Added Successfully!</h2>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 transform transition-all hover:shadow-3xl">
          {/* Product Name */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
              Product Name ✨
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className={`w-full p-4 border-2 rounded-xl bg-gray-50 transition-all duration-300 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none ${errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Enter an awesome product name..."
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 animate-shake">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Description 📝
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className={`w-full p-4 border-2 rounded-xl bg-gray-50 transition-all duration-300 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none resize-none ${errors.description ? 'border-red-500' : 'border-gray-200'
                }`}
              placeholder="Tell us what makes this product special..."
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1 animate-shake">{errors.description}</p>
            )}
            <div className="text-right text-sm text-gray-500 mt-1">
              {product.description.length} characters
            </div>
          </div>

          {/* Price */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-green-600">
              Price 💰
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">$</span>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                step="0.01"
                className={`w-full p-4 pl-10 border-2 rounded-xl bg-gray-50 transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none ${errors.price ? 'border-red-500' : 'border-gray-200'
                  }`}
                placeholder="0.00"
                required
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1 animate-shake">{errors.price}</p>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category 🏷️
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setProduct({ ...product, category: cat.name })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${product.category === cat.name
                    ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="text-3xl mb-1">{cat.icon}</div>
                  <div className="text-sm font-semibold">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller Toggle */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⭐</span>
              <div>
                <label className="font-semibold text-gray-800">Mark as Bestseller</label>
                <p className="text-sm text-gray-600">Highlight this product on your store</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="bestseller"
                checked={product.bestseller}
                onChange={(e) => setProduct({ ...product, bestseller: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:to-orange-500"></div>
            </label>
          </div>

          {/* Image Upload with Drag & Drop */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Images 📸
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-3 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${isDragging
                ? 'border-blue-500 bg-blue-50 scale-105'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                }`}
            >
              <input
                type="file"
                name="image"
                multiple
                onChange={(e) => handleImageChange(e.target.files)}
                className="hidden"
                id="file-upload"
                accept="image/*"
                required={imagePreviews.length === 0}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-6xl mb-4">📤</div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Drop images here or click to upload
                </p>
                <p className="text-sm text-gray-500">Support for multiple images</p>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 ${isSubmitting || Object.keys(errors).length > 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding Product...
              </span>
            ) : (
              '✨ Add Product ✨'
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;
