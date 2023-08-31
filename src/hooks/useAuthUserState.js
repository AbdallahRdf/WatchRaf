import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

export const useAuthUserState = () => {
    const [user, loading] = useAuthState(auth);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
      if (!loading) {
        console.log("in: ", user, loading);
        setShouldRender(true);
      }
    }, [user, loading]);

    return [user, shouldRender];
}