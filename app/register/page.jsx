
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import './register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const { error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPassword,
      options: {
        data: { role: 'user' },
      },
    });

    if (!error) {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) router.push('/login');
      else router.push('/login');
    } else {
      alert(error.message);
      console.error('Register error:', error);
    }
  };

  return (
    <div className="wrapper">
      <div className="title">Register</div>
      <form onSubmit={handleRegister}>
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
        <div className="field">
          <input type="submit" value="Register" />
        </div>
        <div className="signup-link">
          Already have an account? <a href="/login">Login now</a>
        </div>
      </form>
    </div>
  );
}
