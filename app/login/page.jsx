// 'use client';
// import { useState } from 'react';
// import { supabase } from '@/lib/supabase';
// import { useRouter } from 'next/navigation';
// import '@/app/login/login.css';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async () => {
//     const { error } = await supabase.auth.signInWithPassword({ email, password });
//     if (!error) router.push('/dashboard');
//   };

//   return (
//     <div>
//       <h1 className='loginh1'>Login</h1>
//       <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import './login.css'; // Ensure CSS file is correctly imported or globally available

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      router.push('/dashboard');
    } else {
      alert(error.message); // Optional error handling
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Login </div>
      <form onSubmit={handleLogin}>
        <div className="field">
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email Address</label>
        </div>
        <div className="field">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className="content">
          <div className="checkbox">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <div className="pass-link">
            <a href="#">Forgot password?</a>
          </div>
        </div>
        <div className="field">
          <input type="submit" value="Login" />
        </div>
        <div className="signup-link">
          Not a member? <a href="/register">Signup now</a>
        </div>
      </form>
    </div>
  );
}
