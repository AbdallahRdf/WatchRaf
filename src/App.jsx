import { Route, Routes } from "react-router-dom"
//* pages
import { Home } from "./pages/Home";
import { Stats } from "./pages/Stats";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
//* components
import Navbar from "./components/navbar/Navbar";
import Spinner from "./components/Spinner"
import Audios  from "./components/Audios";
//* context file
import { StateContextProvider } from "./context/StateContextProvider";
import { UserDataContextProvider } from "./context/UserDataContextProvider";
import { ResponsivenessContextProvider } from "./context/ResponsivenessContextProvider";
//* custom hooks
import { useLoading } from './hooks/useLoading';
//* firebase related stuff
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

export function App() {
  
  //* useLoading: custom hook check if DOM Content is loaded so to render the page. 
  const isLoading = useLoading();
  
  //* using the 'loading' to check if the 'auth' user object is loaded so to render the page.
  const [user, loading] = useAuthState(auth);

  const commonElements = (
    <>
      <Audios />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );

  return (
    <>
      { isLoading || loading
        ?
        <Spinner />
        :
        <ResponsivenessContextProvider>
          <StateContextProvider>
            {
              user 
              ?
              <UserDataContextProvider>
                { commonElements }
              </UserDataContextProvider>
              :
              commonElements
            }
          </StateContextProvider>
        </ResponsivenessContextProvider>
      }
    </>
  )
}
