import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { 
  Search, 
  User, 
  Heart, 
  Star, 
  Clock, 
  Users, 
  DollarSign,
  BookOpen,
  ChevronDown,
  X,
  Filter,
  SortDesc,
  Menu,
  Bell
} from 'lucide-react';

// Mock Data for Training Classes
const mockClasses = [
  {
    id: 1,
    title: "Master Italian Cooking: From Pasta to Pizza",
    instructor: "Chef Maria Romano",
    description: "Learn authentic Italian cuisine from a Rome-trained chef",
    image: "https://images.pexels.com/photos/1655329/pexels-photo-1655329.jpeg",
    currentFunding: 8750,
    fundingGoal: 12000,
    backers: 127,
    timeLeft: "18 days",
    pricePerPerson: 299,
    maxCapacity: 20,
    currentEnrollment: 15,
    category: "Cooking",
    featured: true,
    syllabus: [
      "Week 1: Italian Culinary Fundamentals",
      "Week 2: Fresh Pasta Making Techniques", 
      "Week 3: Traditional Sauce Mastery",
      "Week 4: Pizza Dough & Toppings",
      "Week 5: Regional Specialties",
      "Week 6: Final Project & Presentation"
    ],
    prerequisites: "Basic kitchen skills helpful but not required",
    duration: "6 weeks, 3 hours per session"
  },
  {
    id: 2,
    title: "Full-Stack Web Development Bootcamp",
    instructor: "Sarah Chen",
    description: "Build modern web applications with React, Node.js, and MongoDB",
    image: "https://images.pexels.com/photos/5700184/pexels-photo-5700184.jpeg",
    currentFunding: 15420,
    fundingGoal: 20000,
    backers: 89,
    timeLeft: "25 days",
    pricePerPerson: 599,
    maxCapacity: 16,
    currentEnrollment: 12,
    category: "Programming",
    featured: true,
    syllabus: [
      "Week 1-2: HTML, CSS, JavaScript Fundamentals",
      "Week 3-4: React.js and Component Architecture",
      "Week 5-6: Node.js and Express Backend",
      "Week 7-8: MongoDB and Database Design",
      "Week 9-10: Authentication & Security",
      "Week 11-12: Deployment & Final Projects"
    ],
    prerequisites: "Basic computer skills, no coding experience required",
    duration: "12 weeks, 4 hours per session"
  },
  {
    id: 3,
    title: "Handcrafted Furniture Making Workshop",
    instructor: "Michael Thompson",
    description: "Create beautiful wooden furniture using traditional techniques",
    image: "https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg",
    currentFunding: 6200,
    fundingGoal: 15000,
    backers: 42,
    timeLeft: "32 days",
    pricePerPerson: 450,
    maxCapacity: 12,
    currentEnrollment: 8,
    category: "Woodworking",
    featured: false,
    syllabus: [
      "Week 1: Wood Selection & Tool Introduction",
      "Week 2: Basic Joinery Techniques",
      "Week 3: Measuring & Planning Your Project",
      "Week 4-6: Building Your First Piece",
      "Week 7: Finishing Techniques",
      "Week 8: Advanced Tips & Troubleshooting"
    ],
    prerequisites: "None - all skill levels welcome",
    duration: "8 weeks, 3 hours per session"
  },
  {
    id: 4,
    title: "Professional Photography Masterclass",
    instructor: "Emma Rodriguez",
    description: "Master the art of professional photography from composition to post-processing",
    image: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg",
    currentFunding: 11800,
    fundingGoal: 18000,
    backers: 156,
    timeLeft: "15 days",
    pricePerPerson: 399,
    maxCapacity: 25,
    currentEnrollment: 18,
    category: "Photography",
    featured: true,
    syllabus: [
      "Week 1: Camera Settings & Technical Foundations",
      "Week 2: Composition & Visual Storytelling",
      "Week 3: Portrait Photography Techniques",
      "Week 4: Landscape & Nature Photography",
      "Week 5: Post-Processing with Lightroom",
      "Week 6: Building Your Portfolio"
    ],
    prerequisites: "DSLR or mirrorless camera required",
    duration: "6 weeks, 2.5 hours per session"
  },
  {
    id: 5,
    title: "High-Intensity Fitness Transformation",
    instructor: "Jake Williams",
    description: "Transform your body with proven HIIT and strength training methods",
    image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    currentFunding: 4500,
    fundingGoal: 8000,
    backers: 78,
    timeLeft: "22 days",
    pricePerPerson: 199,
    maxCapacity: 30,
    currentEnrollment: 22,
    category: "Fitness",
    featured: false,
    syllabus: [
      "Week 1: Fitness Assessment & Goal Setting",
      "Week 2-3: HIIT Fundamentals",
      "Week 4-5: Strength Training Basics",
      "Week 6-7: Advanced Conditioning",
      "Week 8: Nutrition & Recovery"
    ],
    prerequisites: "Medical clearance recommended",
    duration: "8 weeks, 1 hour per session"
  },
  {
    id: 6,
    title: "Watercolor Painting for Beginners",
    instructor: "Lisa Park",
    description: "Discover the beautiful world of watercolor painting",
    image: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg",
    currentFunding: 3200,
    fundingGoal: 6000,
    backers: 64,
    timeLeft: "28 days",
    pricePerPerson: 179,
    maxCapacity: 18,
    currentEnrollment: 11,
    category: "Arts",
    featured: false,
    syllabus: [
      "Week 1: Materials & Basic Techniques",
      "Week 2: Color Theory & Mixing",
      "Week 3: Simple Landscapes",
      "Week 4: Floral Studies",
      "Week 5: Advanced Techniques",
      "Week 6: Personal Project"
    ],
    prerequisites: "No experience needed",
    duration: "6 weeks, 2 hours per session"
  },
  {
    id: 7,
    title: "Music Production & Beat Making",
    instructor: "DJ Marcus Stone",
    description: "Learn to produce professional-quality music tracks",
    image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg",
    currentFunding: 9200,
    fundingGoal: 14000,
    backers: 95,
    timeLeft: "19 days",
    pricePerPerson: 349,
    maxCapacity: 20,
    currentEnrollment: 16,
    category: "Music",
    featured: true,
    syllabus: [
      "Week 1: DAW Introduction & Setup",
      "Week 2: Beat Programming & Rhythm",
      "Week 3: Melody & Harmony Creation",
      "Week 4: Sound Design & Synthesis",
      "Week 5: Mixing & Effects",
      "Week 6: Mastering & Distribution"
    ],
    prerequisites: "Computer with audio software helpful",
    duration: "6 weeks, 3 hours per session"
  },
  {
    id: 8,
    title: "Spanish Conversation Intensive",
    instructor: "Carlos Mendez",
    description: "Achieve conversational fluency through immersive practice",
    image: "https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg",
    currentFunding: 5800,
    fundingGoal: 10000,
    backers: 112,
    timeLeft: "21 days",
    pricePerPerson: 249,
    maxCapacity: 15,
    currentEnrollment: 9,
    category: "Language",
    featured: false,
    syllabus: [
      "Week 1-2: Essential Phrases & Pronunciation",
      "Week 3-4: Daily Conversation Topics",
      "Week 5-6: Past & Future Tenses",
      "Week 7-8: Advanced Conversations",
      "Week 9-10: Cultural Context & Idioms",
      "Week 11-12: Real-world Practice"
    ],
    prerequisites: "Basic Spanish knowledge helpful",
    duration: "12 weeks, 1.5 hours per session"
  }
];

// Component for Class Card
const ClassCard = ({ classData, onClick, isLoggedIn }) => {
  const fundingPercentage = Math.round((classData.currentFunding / classData.fundingGoal) * 100);
  const enrollmentPercentage = Math.round((classData.currentEnrollment / classData.maxCapacity) * 100);
  
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(classData)}
    >
      <div className="relative">
        <img 
          src={classData.image} 
          alt={classData.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {classData.featured && (
          <div className="absolute top-3 left-3 bg-connectwise-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {classData.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-connectwise-primary transition-colors">
          {classData.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {classData.description}
        </p>
        <div className="text-sm text-gray-500 mb-3">
          by {classData.instructor}
        </div>
        
        {/* Funding Progress */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold text-gray-700">
              {fundingPercentage}% funded
            </span>
            <span className="text-sm text-gray-500">
              ${classData.currentFunding.toLocaleString()} goal
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-connectwise-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(fundingPercentage, 100)}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </div>
        
        {/* Enrollment Status */}
        {isLoggedIn && (
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-gray-700">
                {classData.currentEnrollment}/{classData.maxCapacity} enrolled
              </span>
              <span className="text-sm text-gray-500">
                {enrollmentPercentage}% full
              </span>
            </div>
            <div className="w-full bg-connectwise-light rounded-full h-1.5">
              <motion.div 
                className="bg-connectwise-secondary h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${enrollmentPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{classData.backers}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{classData.timeLeft}</span>
            </div>
          </div>
          <div className="font-bold text-connectwise-primary">
            ${classData.pricePerPerson}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Modal Component for Class Details
const ClassModal = ({ classData, isOpen, onClose, isLoggedIn }) => {
  if (!isOpen || !classData) return null;
  
  const fundingPercentage = Math.round((classData.currentFunding / classData.fundingGoal) * 100);
  const enrollmentPercentage = Math.round((classData.currentEnrollment / classData.maxCapacity) * 100);
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{classData.title}</h2>
              <p className="text-gray-600">by {classData.instructor}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={classData.image} 
                  alt={classData.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">About This Class</h3>
                    <p className="text-gray-600">{classData.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2">Prerequisites</h3>
                    <p className="text-gray-600">{classData.prerequisites}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2">Duration</h3>
                    <p className="text-gray-600">{classData.duration}</p>
                  </div>
                </div>
              </div>
              
              <div>
                {/* Funding Progress */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-connectwise-primary">
                      ${classData.currentFunding.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      of ${classData.fundingGoal.toLocaleString()} goal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className="bg-connectwise-primary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{fundingPercentage}% funded</span>
                    <span>{classData.timeLeft} left</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{classData.backers} backers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      <span>${classData.pricePerPerson} per person</span>
                    </div>
                  </div>
                </div>
                
                {/* Enrollment Status (only for logged in users) */}
                {isLoggedIn && (
                  <div className="bg-connectwise-light rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-lg mb-2">Class Capacity</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-connectwise-secondary font-semibold">
                        {classData.currentEnrollment} enrolled
                      </span>
                      <span className="text-sm text-gray-500">
                        {classData.maxCapacity} max capacity
                      </span>
                    </div>
                    <div className="w-full bg-connectwise-secondary bg-opacity-20 rounded-full h-2 mb-2">
                      <div 
                        className="bg-connectwise-secondary h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${enrollmentPercentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      {enrollmentPercentage}% full • {classData.maxCapacity - classData.currentEnrollment} spots remaining
                    </div>
                  </div>
                )}
                
                {/* Syllabus */}
                <div>
                  <h3 className="font-bold text-lg mb-3">Course Syllabus</h3>
                  <div className="space-y-2">
                    {classData.syllabus.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded hover:bg-gray-50">
                        <div className="bg-connectwise-light text-connectwise-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <button className="w-full bg-connectwise-primary hover:bg-connectwise-secondary text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    {isLoggedIn ? 'Enroll Now' : 'Sign In to Enroll'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Header Component
const Header = ({ isLoggedIn, onToggleLogin, searchTerm, onSearchChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-connectwise-primary">ConnectWise University Labs</h1>
            <span className="ml-2 text-sm text-gray-500 hidden lg:block">Training Platform</span>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search training classes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-connectwise-primary focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <>
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Heart size={20} />
                </button>
              </>
            )}
            
            <button
              onClick={onToggleLogin}
              className="flex items-center gap-2 bg-connectwise-primary hover:bg-connectwise-secondary text-white px-4 py-2 rounded-lg transition-colors"
            >
              <User size={18} />
              <span className="hidden sm:block">
                {isLoggedIn ? 'My Account' : 'Sign In'}
              </span>
            </button>
            
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search training classes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-connectwise-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = ({ isLoggedIn }) => {
  return (
    <div className="bg-gradient-to-r from-connectwise-light to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Advance Your 
              <span className="text-connectwise-primary"> Skills</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover innovative hands-on training labs designed for professional growth. 
              Support the classes you want to see and learn cutting-edge skills with industry experts.
            </p>
            <div className="flex gap-4">
              <button className="bg-connectwise-primary hover:bg-connectwise-secondary text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Explore Labs
              </button>
              <button className="border border-connectwise-primary text-connectwise-primary hover:bg-connectwise-light px-8 py-3 rounded-lg font-semibold transition-colors">
                {isLoggedIn ? 'Create Lab' : 'Learn More'}
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d" 
              alt="People learning together"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-connectwise-light p-2 rounded-full">
                  <Star className="text-connectwise-primary" size={20} />
                </div>
                <div>
                  <div className="font-bold text-gray-900">5,000+</div>
                  <div className="text-gray-500 text-sm">Active Learners</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Filter/Sort Controls
const FilterControls = ({ 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange,
  showFeaturedOnly,
  onFeaturedToggle 
}) => {
  const categories = ['All', 'Cooking', 'Programming', 'Woodworking', 'Photography', 'Fitness', 'Arts', 'Music', 'Language'];
  
  return (
    <div className="bg-white border-b p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <span className="font-medium text-gray-700">Categories:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-connectwise-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => onFeaturedToggle(e.target.checked)}
                className="rounded text-connectwise-primary focus:ring-connectwise-primary"
              />
              <span className="text-sm text-gray-700">Featured only</span>
            </label>
            
            <div className="flex items-center gap-2">
              <SortDesc size={18} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-connectwise-primary focus:border-transparent"
              >
                <option value="funding">Funding %</option>
                <option value="backers">Most Backed</option>
                <option value="timeLeft">Ending Soon</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true to show enrollment info
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('funding');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  // Filter and sort classes
  const filteredClasses = mockClasses
    .filter(classData => {
      const matchesSearch = classData.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           classData.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           classData.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || classData.category === selectedCategory;
      const matchesFeatured = !showFeaturedOnly || classData.featured;
      
      return matchesSearch && matchesCategory && matchesFeatured;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'funding':
          return (b.currentFunding / b.fundingGoal) - (a.currentFunding / a.fundingGoal);
        case 'backers':
          return b.backers - a.backers;
        case 'timeLeft':
          return parseInt(a.timeLeft) - parseInt(b.timeLeft);
        case 'price':
          return a.pricePerPerson - b.pricePerPerson;
        default:
          return 0;
      }
    });
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header 
          isLoggedIn={isLoggedIn}
          onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <main>
          <HeroSection isLoggedIn={isLoggedIn} />
          
          <FilterControls
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            showFeaturedOnly={showFeaturedOnly}
            onFeaturedToggle={setShowFeaturedOnly}
          />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoggedIn ? 'Available Training Labs' : 'Featured Training Labs'}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredClasses.length} labs)
                </span>
              </h2>
            </div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {filteredClasses.map((classData, index) => (
                <motion.div
                  key={classData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ClassCard 
                    classData={classData}
                    onClick={setSelectedClass}
                    isLoggedIn={isLoggedIn}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BookOpen size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No labs found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </main>
        
        <ClassModal
          classData={selectedClass}
          isOpen={!!selectedClass}
          onClose={() => setSelectedClass(null)}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;