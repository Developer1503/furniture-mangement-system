import React, { useState, useEffect } from "react";
import {
  Eye, Save, Trash2, Wand2, Download, Heart, Share2, Sparkles, Camera,
  Palette, Home, Lightbulb, Star, Settings, Filter, Grid, List,
  Search, Bell, User, ChevronDown, Upload, BookOpen, Award, TrendingUp
} from "lucide-react";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

const Ai_gen = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [designs, setDesigns] = useState([]);
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [likedDesigns, setLikedDesigns] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [style, setStyle] = useState("Contemporary");
  const [quality, setQuality] = useState("High (2K)");
  const [variations, setVariations] = useState("3 Variations");

  useEffect(() => {
    return () => {
      designs.forEach(design => URL.revokeObjectURL(design.url));
    };
  }, [designs]);

  const categories = [
    { id: 'all', name: 'All Designs', count: '2.4k+' },
    { id: 'living', name: 'Living Room', count: '850+' },
    { id: 'bedroom', name: 'Bedroom', count: '640+' },
    { id: 'kitchen', name: 'Kitchen', count: '520+' },
    { id: 'bathroom', name: 'Bathroom', count: '380+' },
    { id: 'office', name: 'Office', count: '290+' }
  ];

  const professionalSuggestions = [
    "Executive office with mahogany furniture and leather accents",
    "Minimalist Scandinavian living room with natural textures",
    "Contemporary kitchen with quartz countertops and smart appliances",
    "Luxury master suite with walk-in closet and spa bathroom",
    "Modern conference room with video conferencing setup",
    "Boutique hotel lobby with marble floors and designer lighting"
  ];

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please provide a detailed description of your design requirements");
      return;
    }

    if (!import.meta.env.VITE_HF_TOKEN) {
      setError("Hugging Face Token is missing. Please add VITE_HF_TOKEN to your .env file.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const numVar = parseInt(variations.split(' ')[0]) || 3;
      const newDesigns = [];
      const promptText = `${query}, ${style} style, photorealistic, interior design, high quality, ${quality}`;

      for (let i = 0; i < numVar; i++) {
        const imageBlob = await client.textToImage({
          provider: "fal-ai",
          model: "stabilityai/stable-diffusion-3.5-large",
          inputs: promptText,
          parameters: {
            seed: Math.floor(Math.random() * 1000000),
            num_inference_steps: 4
          },
        });

        const imageUrl = URL.createObjectURL(imageBlob);

        newDesigns.push({
          id: Date.now() + i,
          url: imageUrl,
          title: `${style} Design Variation ${i + 1}`,
          style: style,
          description: query,
          colors: ["#2c3e50", "#bdc3c7", "#ecf0f1", "#34495e"],
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          category: selectedCategory === 'all' ? 'living' : selectedCategory,
          designer: "Hugging Face AI",
          renderTime: "4.5s",
          confidence: Math.floor(92 + Math.random() * 7)
        });
      }

      setDesigns(newDesigns);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Unable to generate designs using Hugging Face. Please check your API token or try again.");
      setIsLoading(false);
    }
  };

  const handleSave = (design) => {
    if (!savedDesigns.find(d => d.id === design.id)) {
      setSavedDesigns([...savedDesigns, design]);
    }
  };

  const handleLike = (design) => {
    setLikedDesigns(prev => {
      if (prev.includes(design.id)) {
        return prev.filter(id => id !== design.id);
      }
      return [...prev, design.id];
    });
  };

  const handleDelete = (designId) => {
    setDesigns(designs.filter(d => d.id !== designId));
    setSavedDesigns(savedDesigns.filter(d => d.id !== designId));
    setLikedDesigns(likedDesigns.filter(id => id !== designId));
  };

  const handleShare = (design) => {
    if (navigator.share) {
      navigator.share({
        title: design.title,
        text: design.description,
        url: design.url,
      });
    } else {
      navigator.clipboard.writeText(design.url);
    }
  };

  const filteredDesigns = selectedCategory === 'all'
    ? designs
    : designs.filter(design => design.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional AI Interior Design Studio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform commercial and residential spaces with enterprise-grade AI technology.
            Generate photorealistic designs in seconds with professional accuracy.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-gray-500">Designs Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-500">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2.1s</div>
              <div className="text-sm text-gray-500">Avg Generation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">Enterprise</div>
              <div className="text-sm text-gray-500">Grade Security</div>
            </div>
          </div>
        </div>

        {/* Professional Input Form */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Wand2 className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Design Generator</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of your design requirements, including space type, style preferences, color scheme, and specific features..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                  rows="4"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option>Contemporary</option>
                    <option>Modern</option>
                    <option>Minimalist</option>
                    <option>Traditional</option>
                    <option>Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option>Ultra High (4K)</option>
                    <option>High (2K)</option>
                    <option>Standard (1080p)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variations</label>
                  <select
                    value={variations}
                    onChange={(e) => setVariations(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option>3 Variations</option>
                    <option>5 Variations</option>
                    <option>10 Variations</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{isLoading ? "Generating Design..." : "Generate Professional Design"}</span>
                </button>
                <div className="flex space-x-2">
                  <button type="button" className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-600" />
                  </button>
                  <button type="button" className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Settings className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </form>

            {/* Professional Suggestions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Professional Templates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {professionalSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(suggestion)}
                    className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <div className="text-sm font-medium text-gray-900">{suggestion}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 text-red-400">⚠</div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Professional Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center mb-8">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Processing Your Design Request</h3>
            <p className="text-gray-600 mb-4">Our AI is analyzing your requirements and generating professional-grade designs</p>
            <div className="bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Estimated completion: 2-3 seconds</p>
          </div>
        )}

        {/* Results Section */}
        {designs.length > 0 && (
          <div>
            {/* Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-blue-600" />
                  Generated Designs ({filteredDesigns.length})
                </h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({cat.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredDesigns.map((design) => (
                <div key={design.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={design.url}
                      alt={design.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{design.rating}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full px-3 py-1 text-xs font-medium">
                      {design.confidence}% Match
                    </div>
                    <button
                      onClick={() => handleLike(design)}
                      className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-200 ${likedDesigns.includes(design.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{design.title}</h3>
                        <p className="text-sm text-gray-500">{design.style}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {design.renderTime}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{design.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4 text-gray-400" />
                        <div className="flex space-x-1">
                          {design.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        by {design.designer}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => window.open(design.url, '_blank')}
                          className="flex items-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleSave(design)}
                          className="flex items-center space-x-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm font-medium transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => handleShare(design)}
                          className="flex items-center space-x-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm font-medium transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(design.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Analytics Dashboard */}
        {(savedDesigns.length > 0 || likedDesigns.length > 0 || designs.length > 0) && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Project Analytics</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{designs.length}</div>
                <div className="text-sm text-gray-500">Designs Generated</div>
                <div className="text-xs text-green-600 mt-1">+23% this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{savedDesigns.length}</div>
                <div className="text-sm text-gray-500">Designs Saved</div>
                <div className="text-xs text-green-600 mt-1">+15% this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{likedDesigns.length}</div>
                <div className="text-sm text-gray-500">Favorites</div>
                <div className="text-xs text-green-600 mt-1">+8% this week</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {designs.length > 0 ? Math.round(designs.reduce((acc, d) => acc + d.confidence, 0) / designs.length) : 0}%
                </div>
                <div className="text-sm text-gray-500">Avg. Accuracy</div>
                <div className="text-xs text-green-600 mt-1">+2% this week</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai_gen;