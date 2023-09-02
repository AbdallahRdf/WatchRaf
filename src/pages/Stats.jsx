import { useAuthState } from "react-firebase-hooks/auth";
import { BarChart } from "../components/BarChart";
import { auth } from "../firebase/firebase";

export const Stats = ()=>{
  const [user] = useAuthState(auth);

  return (
    <div className="timer">
      <h2 className="mb-4 mt-3">Activity Summary</h2>
      {!user && <p className="text-secondary">* This report will be available when you are logged in</p>}
      <BarChart user={user} />
    </div>
  )
}
