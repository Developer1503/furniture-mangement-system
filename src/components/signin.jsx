import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    const userData = { email, password }; // Replace with actual user data
    login(userData);
    history.push('/');
  };

  return (
    <div className="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="bx bxl-facebook"></i></a>
            <a href="#" className="social"><i className="bx bxl-google"></i></a>
            <a href="#" className="social"><i className="bx bxl-linkedin"></i></a>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
