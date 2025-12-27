import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const loginData = await authService.login(email, password);
      const decode = jwtDecode(loginData.access);
      const profileData = await authService.getProfile();

      dispatch(setUser({
        id: decode.user_id,
        role: decode.role,
        permissions: decode.permissions,
        name: profileData.full_name,
      }));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
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
