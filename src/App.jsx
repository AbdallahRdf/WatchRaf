import { Route, Routes } from "react-router-dom"
//* pages
import { Home } from "./pages/Home";
import { Stats } from "./pages/Stats";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
//* components
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner"
import Audios  from "./components/Audios";
//* context file
import { StateContextProvider } from "./context/StateContextProvider";
import { UserDataContextProvider } from "./context/UserDataContextProvider";
import { ResponsivenessContextProvider } from "./context/ResponsivenessContextProvider";
//* custom hooks
import { useAuthUserState } from "./hooks/useAuthUserState";
import { useLoading } from './hooks/useLoading';

export function App() {
  
  const shouldRender = useAuthUserState();

  //* is DOM Content loaded ?
  const [isLoading] = useLoading();

  return (
    <>
      { isLoading || !shouldRender
        ?
        <Spinner />
        :
        <>
          <StateContextProvider>
            <UserDataContextProvider>
              <ResponsivenessContextProvider>
                <Audios />
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </ResponsivenessContextProvider>
            </UserDataContextProvider>
          </StateContextProvider>
        </>
      }
    </>
  )
}
