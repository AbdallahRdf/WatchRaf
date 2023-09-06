//* react hooks
import { useContext, useEffect, useLayoutEffect } from "react";
import MyContext from "../context/MyContext";
//* firebase
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const useInitializeDataFromDb = (state, user, setBreaks, setPomos) => {
    // console.log('is been run', user);
    
    const pomoDataFromDB = [];
    const breakDataFromDB = [];
    const pomoData = [];
    const breakData = [];
    let todayBreakCount = []
    let todayPomosCount = []

    const getDocuments = async () => {
        if (!user) {
          console.log(
            "User is null or not yet available. Skipping data fetch."
          );
          return;
        }
        const lastFourWeeksDate = new Date();
        lastFourWeeksDate.setDate(lastFourWeeksDate.getDate() - 28);
        lastFourWeeksDate.setHours(0, 0, 0, 0);

        const chartCollectionRef = collection(db, "chart");
        const queryRef = query(
          chartCollectionRef,
          where("uid", "==", user.uid),
          where("timestamp", ">=", lastFourWeeksDate),
          orderBy("timestamp", "asc")
        );

        const todayData = new Date();

        const data = await getDocs(queryRef);
        const formattedData = data.docs.map((doc) => {
            const dataArr = { ...doc.data() };
            pomoDataFromDB.push({
                pomosCount: dataArr.pomodoroCount,
                date: dataArr.timestamp.toDate(),
            });
            breakDataFromDB.push({
                breaksCount: dataArr.breakCount,
                date: dataArr.timestamp.toDate(),
            });
            return dataArr;
        });
        todayPomosCount = pomoDataFromDB.filter(
            (pomo) => pomo.date.getDate() === todayData.getDate()
        );
        todayBreakCount = breakDataFromDB.filter(
            (brek) => brek.date.getDate() === todayData.getDate()
        );
        todayBreakCount.length > 0 && setBreaks(todayBreakCount[0].breaksCount);
        todayPomosCount.length > 0 && setPomos(todayPomosCount[0].pomosCount);
    };
    
    useEffect(() => {
        const asyncFunc = async () => {
          await getDocuments();
          if(user) {
            // console.log('user: ',user);
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 27);

            for (let i = 1; i < 28; i++) {
              const currentDate = new Date(startDate);

              const pomo = pomoDataFromDB.filter(
                (pomo) => pomo.date.getDate() === currentDate.getDate()
              );
              if (pomo.length > 0) {
                pomoData.push(pomo[0]);
              } else {
                pomoData.push({ pomosCount: 0, date: currentDate });
              }

              let brek = breakDataFromDB.filter(
                (brek) => brek.date.getDate() === currentDate.getDate()
              );
              if (brek.length > 0) {
                breakData.push(brek[0]);
              } else {
                breakData.push({ breaksCount: 0, date: currentDate });
              }
              startDate.setDate(startDate.getDate() + 1);
            }
            pomoData.push({ pomosCount: state.pomosCount, date: startDate });
            breakData.push({ breaksCount: state.breakCount, date: startDate });
        }
    }
    asyncFunc().then(() => console.log('from the hook:',pomoData))
    
    }, [user])
    
    return [pomoData, breakData];
}
