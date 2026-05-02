import React, { useState } from 'react'
import '../auth.form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

function Login() {
    const {loading,handleLogin}=useAuth()
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const[password,setPassword]=useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return (<main><h1>loading.....</h1></main>)
    }

  return (
    <main>
        <div className='form-container'>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" id='email' name='email' placeholder='Enter Email Address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id='password' name='password' placeholder='Enter Passsword' />
                </div>
                <button className='button primary-button'>LOGIN</button>

            </form>
            <p>Dont have an account?<Link to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login
