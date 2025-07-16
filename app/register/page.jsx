// "use client";
// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleRegister = async () => {
//     const { error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: { role: "user" }, // ✅ store role as user
//       },
//     });

//     if (!error) {
//       router.push("/dashboard");
//     } else {
//       alert(error.message); // Optional: show error if signup fails
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleRegister = async () => {
//     const cleanEmail = email.trim();
//     const cleanPassword = password.trim();

//     const { error } = await supabase.auth.signUp({
//       email: cleanEmail,
//       password: cleanPassword,
//       options: {
//         data: { role: "user" },
//       },
//     });

//     if (!error) {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (session) router.push("/dashboard");
//       else router.push("/login");
//     } else {
//       alert(error.message);
//       console.log("Register error:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         value={email}
//       />
//       <input
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         value={password}
//       />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }






'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import './register.css'; // Reuse the same CSS

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
