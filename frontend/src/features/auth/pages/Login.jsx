import React from 'react'
import '../auth.form.scss'

function Login() {
  return (
    <main>
        <div className='form-container'>
            <h1>LOGIN</h1>
            <form>
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
        </div>
    </main>
  )
}

export default Login
