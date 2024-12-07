import React from 'react'
import { LogoutBtn,Logo,Container } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Header() {
  //this gives true if user is login else false
  const authStatus = useSelector((state)=> state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name:'Home',
      to: '/',
      active: true
    }, 
    {
      name: "Login",
      to: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      to: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      to: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      to: "/add-post",
      active: authStatus,
  }
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='logo mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
              </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header