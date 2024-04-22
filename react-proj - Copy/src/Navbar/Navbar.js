import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';


const Navbar = () => {
  const { pathname } = useLocation();

  const [props, set] = useSpring(() => ({
    scale: 1,
    config: { tension: 400, friction: 20 },
  }));

  return (
<nav class="navbar bg-fuchsia-700">
  <div class="container mx-auto">
    <ul class="relative flex h-16 items-center justify-center">
      <li class="mr-4">
        <Link to="/" class={`nav-link ${pathname === '/' ? 'active' : ''}`}>
          <span class="text-white">Home</span>
        </Link>
      </li>
      <li class="mr-4">
        <Link to="/add-post" class={`nav-link ${pathname === '/add-post' ? 'active' : ''}`}>
          <span class="text-white">Write Post</span>
        </Link>
      </li>
      <li class="mr-4">
        <Link to="/login" class={`nav-link ${pathname === '/login' ? 'active' : ''}`}>
          <span class="text-white">Login</span>
        </Link>
      </li>
      <li >
        <Link to="/register" class={`nav-link ${pathname === '/register' ? 'active' : ''}`}>
          <span class="text-white">Register</span>
        </Link>
      </li>
    
    </ul>
  </div>
</nav>

  
  );
};

export default Navbar;
