import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css'; 
import { animated, useSpring } from 'react-spring';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});


const Login = () => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };


  const slideInAnimation = useSpring({
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: 'translateX(-50px)' },
    config: { duration: 500 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    console.log(credentials);
    try {
      const response = await fetch("http://localhost:3000/users/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem("userId", data.foundedUser._id);
      } else {
      }
    } catch (error) {
    }
  };
  return (
<div className="login-container mt-12 p-8 rounded-lg shadow-2xl bg-gradient-to-r from-blue-400 to-purple-500 ">
  <h2 className="login-header text-3xl mb-6 text-white ">Login</h2>
  <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={LoginSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log(values);
        setSubmitting(false);
      }, 500);
    }}
  >
    {({ isSubmitting }) => (
      <Form className="login-form space-y-6">
        <div className="form-group">
          <label htmlFor="email" className="label text-white ">Email</label>
          <Field id="email" name="email" type="email" className="input-field bg-transparent border-b-2 border-white text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-yellow-300" />
          <ErrorMessage name="email" component="div" className="error-message text-red-300" />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="label text-white">Password</label>
          <Field id="password" name="password" type="password" className="input-field bg-transparent border-b-2 border-white text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-yellow-300" />
          <ErrorMessage name="password" component="div" className="error-message text-red-300" />
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button bg-white text-gray-900 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
          Submit
        </button>
      </Form>
    )}
  </Formik>
</div>

  
  );
};

export default Login;
