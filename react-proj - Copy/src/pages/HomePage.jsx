import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const userId = localStorage.getItem("userId");

  const location = useLocation(); // Access the location object

  useEffect(() => {
    fetchBlogs();
    fetchUser();
  }, [location.search]);

  const fetchBlogs = async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      if (query === "favorite") {
        try {
          const response = await axios.get(`http://localhost:3000/users/${userId}`);
          setUser(response.data);
          setBlogs(response.data.favorite);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        try {
          const response = await axios.get(`http://localhost:3000/blogs/search/${query}`);
          setBlogs(response.data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      }
    } else {
      try {
        const response = await axios.get("http://localhost:3000/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const openPopup = (blog) => {
    setSelectedBlog(blog);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBlog(null);
  };

  return (
    <div className="p-4 max-w-100 h-100 mx-auto pb-32">
    {blogs.map((blog, index) => (
      <div key={blog._id} className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <img src={`${blog.image}`} className="w-full h-64 object-cover object-center" />
        <div className="p-4">
          <h2 className="text-xl text-blue-700 font-bold mb-2">{blog.title}</h2>
          {blog.user && <p className="text-fuchsia-600 text-base mb-4">{blog.content}</p>}
          <p className="text-blue-500 text-sm">Published on {blog.createdAt}</p>
          <div className="pt-4 flex justify-between">
            <button onClick={() => openPopup(blog)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Open Popup
            </button>
          </div>
        </div>
      </div>
    ))}
    {/* Popup */}
    {showPopup && selectedBlog && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 max-w-md rounded-lg">
          <img src={`${selectedBlog.image}`} className="w-full h-64 object-cover object-center mb-4" />
          <h2 className="text-2xl font-bold text-blue-700 mb-4">{selectedBlog.title}</h2>
          <p className="text-fuchsia-600">{selectedBlog.content}</p>
          <button onClick={closePopup} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default HomePage;