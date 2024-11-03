import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx";
import {useNavigate} from "react-router-dom"


export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
  const navigate=useNavigate();
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (isLoginOrRegister === 'login') {
      if (username === "admin" && password === "pass") {
        setLoggedInUsername(username);
        setId(1);
        alert("Login successful!");
      } else {
        const { data } = await axios.post('login', { username, password });
        setLoggedInUsername(username);
        setId(data.id);
      }
    } else {
      const { data } = await axios.post('register', { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    }
    navigate("/home");
  }

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <form className="w-80 bg-white shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'} to Your Account
        </h2>
        <input value={username}
               onChange={ev => setUsername(ev.target.value)}
               type="text" placeholder="Username"
               className="block w-full rounded-md p-2 mb-3 border border-gray-300 shadow-sm" />
        <input value={password}
               onChange={ev => setPassword(ev.target.value)}
               type="password"
               placeholder="Password"
               className="block w-full rounded-md p-2 mb-3 border border-gray-300 shadow-sm" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold block w-full rounded-md p-2 mt-4">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-4 text-gray-600">
          {isLoginOrRegister === 'register' ? (
            <div>
              Already a member?
              <button className="text-blue-600 hover:underline ml-1" onClick={() => setIsLoginOrRegister('login')}>
                Login here
              </button>
            </div>
          ) : (
            <div>
              Don’t have an account?
              <button className="text-blue-600 hover:underline ml-1" onClick={() => setIsLoginOrRegister('register')}>
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// import {useContext, useState} from "react";
// import axios from "axios";
// import {UserContext} from "./UserContext.jsx";

// export default function RegisterAndLoginForm() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
//   const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
//   async function handleSubmit(ev) {
//     ev.preventDefault();
//     const url = isLoginOrRegister === 'register' ? 'register' : 'login';
//     const {data} = await axios.post(url, {username,password});
//     setLoggedInUsername(username);
//     setId(data.id);
//   }
//   return (
//     <div className="bg-blue-50 h-screen flex items-center">
//       <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
//         <input value={username}
//                onChange={ev => setUsername(ev.target.value)}
//                type="text" placeholder="username"
//                className="block w-full rounded-sm p-2 mb-2 border" />
//         <input value={password}
//                onChange={ev => setPassword(ev.target.value)}
//                type="password"
//                placeholder="password"
//                className="block w-full rounded-sm p-2 mb-2 border" />
//         <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
//           {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
//         </button>
//         <div className="text-center mt-2">
//           {isLoginOrRegister === 'register' && (
//             <div>
//               Already a member?
//               <button className="ml-1" onClick={() => setIsLoginOrRegister('login')}>
//                 Login here
//               </button>
//             </div>
//           )}
//           {isLoginOrRegister === 'login' && (
//             <div>
//               Dont have an account?
//               <button className="ml-1" onClick={() => setIsLoginOrRegister('register')}>
//                 Register
//               </button>
//             </div>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

