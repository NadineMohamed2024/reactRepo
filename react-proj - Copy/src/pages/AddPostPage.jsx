import React, { useState } from 'react';
import axios from 'axios';
import "./AddPostPage.css"

const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const userId = localStorage.getItem('userId');

  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  
  const handleSubmit = async (event) => {
    console.log(currentDate);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('user', userId);
      formData.append('createdAt', formattedDate);
      const response = await axios.post('http://localhost:3000/blogs/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(formData);
      console.log('Blog added successfully:', response.data);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };
  

  return (
    <>
<div class="h-screen flex justify-center items-center">
  <div class="custom-form">
    <h1 class="text-3xl font-bold mb-4 text-center text-blue-600">Create post</h1>
    <form class="space-y-6">
      <div class="input-group">
        <label for="title" class="input-label">Title</label>
        <input type="text" value={title} onChange={handleTitleChange}  id="title" class="input-field" placeholder="Enter title..." />
      </div>
      <div class="input-group">
        <label for="content" class="input-label">Content</label>
        <textarea id="content" value={content} onChange={handleContentChange}  rows="6" class="input-field textarea-field" placeholder="Enter content..."></textarea>
      </div>
      <div class="input-group">
        <label for="image" class="input-label">Image</label>
        <div class="file-upload">
          <input onChange={handleImageChange}  type="file" id="image" class="file-input" />
          <label for="image" class="file-label">Choose Image</label>
        </div>
      </div>
    </form>
      <button  onClick={handleSubmit}>Submit</button>
  </div>
</div>




    </>
  );
};

export default AddPostPage;