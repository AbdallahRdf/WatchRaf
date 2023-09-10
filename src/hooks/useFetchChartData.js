import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";

export const useFechChartData = (user, state, setBreakData, setPomoData) => {
    useEffect(() => {
      const pomoDataFromDB = [];
      const breakDataFromDB = [];
      const pomoData = [];
      const breakData = [];
      let todayBreakCount = [];
      let todayPomosCount = [];

      const fetchData = async () => {
        if (!user) {
          // console.log(
          //   "User is null or not yet available. Skipping data fetch."
          // );
          return;
        }
        //* setting the date for the last 28 days;
        const lastFourWeeksDate = new Date();
        lastFourWeeksDate.setDate(lastFourWeeksDate.getDate() - 28);
        lastFourWeeksDate.setHours(0, 0, 0, 0);

        const chartCollectionRef = collection(db, "chart");
        const queryRef = query(
          chartCollectionRef,
          where("uid", "==", user.uid),
          where("timestamp", ">=", lastFourWeeksDate),
          orderBy("timestamp", "desc")
        );
        //* will contain the date of the oldest doc in the chart collection
        let oldestDateInDB = new Date();

        const data = await getDocs(queryRef);
        const formattedData = data.docs.map((doc) => {
          const dataArr = doc.data();

          pomoDataFromDB.push({
            pomosCount: dataArr.pomodoroCount,
            date: dataArr.timestamp.toDate(),
          });

          breakDataFromDB.push({
            breaksCount: dataArr.breakCount,
            date: dataArr.timestamp.toDate(),
          });

          if (oldestDateInDB > dataArr.timestamp.toDate()) {
            oldestDateInDB = new Date(dataArr.timestamp.toDate());
          }
          return dataArr;
        });
        //* gets the day, month & the year of the oldest date.
        const oldestDay = oldestDateInDB.getDate();
        const oldestMonth = oldestDateInDB.getMonth();
        const oldestYear = oldestDateInDB.getFullYear();

        const todayDate = new Date();

        todayPomosCount = pomoDataFromDB.filter(
          (pomo) => pomo.date.getDate() === todayDate.getDate()
        );
        todayBreakCount = breakDataFromDB.filter(
          (brek) => brek.date.getDate() === todayDate.getDate()
        );
        todayBreakCount.length > 0 && setBreaks(todayBreakCount[0].breaksCount);
        todayPomosCount.length > 0 && setPomos(todayPomosCount[0].pomosCount);

        //* pushing first the count of today
        pomoData.push({
          pomosCount: state.pomosCount,
          date: new Date(todayDate),
        });
        breakData.push({
          breaksCount: state.breakCount,
          date: new Date(todayDate),
        });

        todayDate.setDate(todayDate.getDate() - 1);
        //* in this loop, we fill in the rest of the arrays with the counts data of the last 27 days, if there is none, it fills it with 0
        for (let i = 1; i < 28; i++) {
          const currentDate = new Date(todayDate);

          const condition1 = breakData.some((brek) => {
            return (
              brek.date.getDate() == oldestDay &&
              brek.date.getMonth() == oldestMonth &&
              brek.date.getFullYear() == oldestYear
            );
          });
          const condition2 = pomoData.some((pomo) => {
            return (
              pomo.date.getDate() == oldestDay &&
              pomo.date.getMonth() == oldestMonth &&
              pomo.date.getFullYear() == oldestYear
            );
          });
          if (condition1 && condition2 && pomoData.length % 7 === 0) {
            break;
          }
          //* checks if there is in the data we fetched form db a date that equals the currentDate
          const pomo = pomoDataFromDB.filter(
            (pomo) => pomo.date.getDate() === currentDate.getDate()
          );
          //* if true pushes it, if false pushes an obj with count equal 0
          if (pomo.length > 0) {
            pomoData.push(pomo[0]);
          } else {
            pomoData.push({ pomosCount: 0, date: currentDate });
          }

          //* checks if there is in the data we fetched form db a date that equals the currentDate
          let brek = breakDataFromDB.filter(
            (brek) => brek.date.getDate() === currentDate.getDate()
          );
          //* if true pushes it, if false pushes an obj with count equal 0
          if (brek.length > 0) {
            breakData.push(brek[0]);
          } else {
            breakData.push({ breaksCount: 0, date: currentDate });
          }

          todayDate.setDate(todayDate.getDate() - 1);
        }
        //* setting the states to the formatted data.
        setPomoData(pomoData.reverse());
        setBreakData(breakData.reverse());
      };

      fetchData();
    }, [user]);
}