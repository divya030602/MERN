import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <><div><h1>Welcome to Home page!</h1></div><div> <Link to="/login">
          <button className="btn-primary">Log out</button>
      </Link> </div> </ >
   
  )
}

export default Home