import React from 'react'
import '../auth.form.scss'
import { Link } from 'react-router'

function Login() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <main>
        <div className='form-container'>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' name='email' placeholder='Enter Email Address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">password</label>
                    <input type="password" id='password' name='password' placeholder='Enter Passsword' />
                </div>
                <button className='button primary-button'>LOGIN</button>

            </form>
            <p>Dont have an account?<Link to="/login">Register</Link></p>
        </div>
    </main>
  )
}

export default Login
