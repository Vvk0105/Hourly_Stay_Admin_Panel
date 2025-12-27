import { useSelector } from "react-redux";

export default function Dashboard() {
    const user = useSelector(state => state.auth.user )
    console.log('redux store check',user);
    
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}
