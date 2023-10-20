import { useEffect, useState } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useTodayDoc = (user, state) => {
    let [todayDocId, setTodayDocId] = useState(null);

    useEffect(() => {
      const chartCollection = collection(db, "chart");

      //* it checks if there is a doc with today's date and returns it
      const getTodayDoc = async () => {
        try {
          if (user) {
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);

            const queryRef = query(
              chartCollection,
              where("uid", "==", user.uid),
              where("timestamp", ">=", todayDate)
            );
            const todayDoc = await getDocs(queryRef);
            const formattedTodayDoc = todayDoc.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            return formattedTodayDoc;
          }
        } catch (error) {
          console.error("Error fetching today's document:", error);
        }
      };

      //* if there is no today's doc it creates it and returns it id;
      const createTodayDoc = async () => {
        try {
          if (user) {
            const todayDoc = await getTodayDoc();
            if (todayDoc.length === 0) {
                const dataToAdd = {
                breakCount: state.breakCount,
                pomodoroCount: state.pomosCount,
                timestamp: new Date(),
                uid: user.uid,
                };
                const docRef = await addDoc(chartCollection, dataToAdd);
                setTodayDocId(docRef.id)
            } else {
                setTodayDocId(todayDoc[0].id);
            }
          }
        } catch (error) {
          console.error("Error creating today's document:", error);
        }
      };

      createTodayDoc();
    }, [user]);

    return todayDocId;
}