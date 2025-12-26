import { useState } from "react";
import api from "../api/axios";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        const res = await api.post("users/auth/login/", {
            email,
            password
        })

        const { access, refresh } = res.data

        localStorage.setItem("access", access)
        localStorage.setItem("refresh", refresh)

        const decode = jwtDecode(access)

        const profileRes = await api.get("users/profile/")

        dispatch(setUser({
            id: decode.user_id,
            role: decode.role,
            permissions: decode.permissions,
            name: profileRes.data.full_name,
        }))
        
        navigate("/dashboard")
    }
    

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" type="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
