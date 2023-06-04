import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="py-3 w-100 bg-dark" style = {{position: 'fixed', bottom: '0', height: '50px'}}>
        <div className="container d-flex justify-content-center">
          <Link className="text-decoration-none" to="/"><span className="text-white">PirateBay Inc. 2022</span></Link>
        </div>
      </footer>
  )}

export default Footer