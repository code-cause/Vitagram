// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { instance } from "../../services/Api";

// const Signup = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullname, setFullname] = useState("");
//   const [username, setUsername] = useState("");

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   let navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     console.log('Form values:', {
//       emailOrPhone,
//       password,
//       fullname,
//       username
//     });

//     // Validate all fields
//     if (!emailOrPhone || !password || !fullname || !username) {
//       console.log('Empty fields detected:', {
//         hasEmail: !!emailOrPhone,
//         hasPassword: !!password,
//         hasFullname: !!fullname,
//         hasUsername: !!username
//       });
//       setError("All fields are required");
//       setIsLoading(false);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{10}$/;
    
//     if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
//       console.log('Email validation failed:', emailOrPhone);
//       setError("Please enter a valid email or phone number");
//       setIsLoading(false);
//       return;
//     }

//     // Password validation
//     if (password.length < 6) {
//       console.log('Password length:', password.length);
//       setError("Password must be at least 6 characters long");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await instance.post('/auth/signup', {
//         name: fullname,
//         email: emailOrPhone,
//         password: password
//       });

//       console.log('API Response:', response.data);
      
//       if (response.data.success) {
//         // Store user data and token in localStorage
//         localStorage.setItem('name', JSON.stringify(response.data.data.name)); 
//         console.log("70", response.data)
        
//         // Store the token
//         if (response.data.data && response.data.data.token) {
//           localStorage.setItem('token', response.data.data.token);
//         }
        
//         // Clear form and errors
//         setError("");
//         setEmailOrPhone("");
//         setPassword("");
//         setFullname("");
//         setUsername("");
        
//         // Navigate to home page since signup was successful
//         navigate('/home');
//       } else {
//         setError(response.data.message || "Signup failed. Please try again.");
//       }
//     } catch (err) {
//       console.error('Signup error:', err);
//       setError(err.response?.data?.message || "Signup failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-4">
//       <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-300 w-full max-w-sm">
//         <div className="flex justify-center mb-8">
//           <i
//             data-visualcompletion="css-img"
//             aria-label="Instagram"
//             role="img"
//             style={{
//               backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png")',
//               backgroundPosition: '0px -52px',
//               backgroundSize: 'auto',
//               width: '175px',
//               height: '51px',
//               backgroundRepeat: 'no-repeat',
//               display: 'inline-block'
//             }}
//           ></i>
//         </div>

//         <p className="text-center text-gray-500 font-medium mb-6">
//           Sign up to see photos and videos from your friends.
//         </p>

//         {error && (
//           <div className="mb-4 p-2 text-center text-sm text-white bg-red-500 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <button
//             type="button"
//             className="w-full py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded transition flex items-center justify-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
//             </svg>
//             Log in with Facebook
//           </button>

//           <div className="flex items-center my-4">
//             <div className="flex-grow border-t border-gray-300"></div>
//             <div className="mx-4 text-sm text-gray-500">OR</div>
//             <div className="flex-grow border-t border-gray-300"></div>
//           </div>

//           <div>
//             <input
//               type="text"
//               className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
//               value={emailOrPhone}
//               onChange={(e) => setEmailOrPhone(e.target.value)}
//               placeholder="Mobile Number or Email"
//             />
//           </div>
//           <div>
//             <input
//               type="password"  // Changed from text to password
//               className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//             />
//           </div><div>
//             <input
//               type="text"
//               className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
//               value={fullname}
//               onChange={(e) => setFullname(e.target.value)}
//               placeholder="Full Name"
//             />
//           </div><div>
//             <input
//               type="text"
//               className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="User Name"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-1.5 text-sm font-medium text-white rounded ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} transition`}
//           >
//             {isLoading ? 'Signing up...' : 'Sign Up'}
//           </button>
//         </form>

//         <p className="text-xs text-gray-500 text-center mt-4">
//           People who use our service may have uploaded your contact information to Instagram. <a href="#" className="text-blue-900">Learn More</a>
//         </p>

//         <p className="text-xs text-gray-500 text-center mt-4">
//           By signing up, you agree to our <a href="#" className="text-blue-900">Terms</a>, <a href="#" className="text-blue-900">Privacy Policy</a> and <a href="#" className="text-blue-900">Cookies Policy</a>.
//         </p>
//       </div>

//       <div className="bg-white p-4 mt-3 border border-gray-300 w-full max-w-sm text-center text-sm">
//         Have an account? <a href="/login" className="text-blue-500 font-medium">Log in</a>
//       </div>

//       <div className="mt-6 text-center">
//         <p className="text-xs text-gray-500">Get the app.</p>
//         <div className="flex justify-center space-x-2 mt-2">
//           <a href="#">
//             <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="App Store" className="h-10" />
//           </a>
//           <a href="#">
//             <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="Google Play" className="h-10" />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;














import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/Api";

const Signup = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!emailOrPhone || !password || !fullname || !username) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError("Please enter a valid email or phone number");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await instance.post('/auth/signup', {
        name: fullname,
        email: emailOrPhone,
        password: password,
      });

      if (response.data.success) {
        // ✅ Store token and full user data in localStorage
        const { token, user } = response.data.data;
        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(user));
        }
 navigate('/home');
        // Clear form
        setEmailOrPhone("");
        setPassword("");
        setFullname("");
        setUsername("");
        setError("");

        // navigate("/home");
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-4">
      <div className="bg-white p-8 sm:p-10 rounded-lg border border-gray-300 w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <i
            aria-label="Instagram"
            role="img"
            style={{
              backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png")',
              backgroundPosition: '0px -52px',
              backgroundSize: 'auto',
              width: '175px',
              height: '51px',
              backgroundRepeat: 'no-repeat',
              display: 'inline-block',
            }}
          ></i>
        </div>

        <p className="text-center text-gray-500 font-medium mb-6">
          Sign up to see photos and videos from your friends.
        </p>

        {error && (
          <div className="mb-4 p-2 text-center text-sm text-white bg-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            placeholder="Mobile Number or Email"
          />
          <input
            type="password"
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="text"
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-1.5 text-sm font-medium text-white rounded ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} transition`}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>

      <div className="bg-white p-4 mt-3 border border-gray-300 w-full max-w-sm text-center text-sm">
        Have an account? <a href="/login" className="text-blue-500 font-medium">Log in</a>
      </div>
    </div>
  );
};

export default Signup;
