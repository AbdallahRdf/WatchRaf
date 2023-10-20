//* firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
//* components
import { UserBarChart } from "../components/stats/UserBarChart";
import { NoUserBarChart } from "../components/stats/NoUserBarChart";

export const Stats = ()=>{

  console.count("Stats number: ");

  const [user] = useAuthState(auth);

  return (
    <>
      {
        user
          ?
          <UserBarChart />
          :
          <NoUserBarChart user={user}/>
      } 
    </>
  )
}
