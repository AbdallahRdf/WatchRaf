import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, getDocs, where, orderBy } from "firebase/firestore";

export const useFetchChartData = (user, state, setBreakData, setPomoData, setPomos, setBreaks) => {

  useEffect(() => {

    //* getChartData function: gets the chart data of the laset 28 days (4 weeks) from the db,
    //* parses it, then returns: one array for pomodoro data, one for breaks, and return also
    //* the date of the oldest document in the db;
    const getChartData = async () => {

        //* pomoDataFromDB & breakDataFromDB: these two arrays are gonna contains the chart data that we get from the db;
        const pomoDataFromDB = [];
        const breakDataFromDB = [];

        //* lastFourWeeksDate variable, will hold the date of the day before 28 days ago.
        const lastFourWeeksDate = new Date();
        lastFourWeeksDate.setDate(lastFourWeeksDate.getDate() - 28);
        lastFourWeeksDate.setHours(0, 0, 0, 0);

        const chartCollectionRef = collection(db, "chart"); // get the chart collection reference;
        const queryRef = query(
            chartCollectionRef,
            where("uid", "==", user.uid),
            where("timestamp", ">=", lastFourWeeksDate),
            orderBy("timestamp", "desc")
        );
        //* oldestDateInDB will hold the date of the oldest doc in the chart collection
        let oldestDateInDB = new Date();

        //* fetching chart documents from the database
        const data = await getDocs(queryRef);

        data.docs.forEach((doc) => {
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
        return [pomoDataFromDB, breakDataFromDB, oldestDateInDB];
    }

    //* setChartState function: updates the chart state that we use to render the chart data;
    const setChartState = (pomoDataFromDB, breakDataFromDB) => {
        //* todayPomosCount & todayBreakCount: will hold today's data that we got from db
        let todayBreakCount = [];
        let todayPomosCount = [];

        //* get today's chart data from all the chart data we got from the db;
        todayPomosCount = pomoDataFromDB.filter(
            (pomo) => pomo.date.getDate() === new Date().getDate()
        );
        todayBreakCount = breakDataFromDB.filter(
            (brek) => brek.date.getDate() === new Date().getDate()
        );
        //* if there is a doc that holds data for today, modify the state to show it on the chart;
        todayBreakCount.length > 0 && setBreaks(todayBreakCount[0].breaksCount);
        todayPomosCount.length > 0 && setPomos(todayPomosCount[0].pomosCount);
    }

    const fetchData = async () => {

        const [pomoDataFromDB, breakDataFromDB, oldestDateInDB] = await getChartData();
        
        setChartState(pomoDataFromDB, breakDataFromDB);

        //* gets the day, month & the year of the oldest date.
        const oldestDay = oldestDateInDB.getDate();
        const oldestMonth = oldestDateInDB.getMonth();
        const oldestYear = oldestDateInDB.getFullYear();


        const pomoData = [];
        const breakData = [];

        //* pushing first into the array, today's data;
        pomoData.push({
        pomosCount: state.pomosCount,
        date: new Date(),
        });
        breakData.push({
        breaksCount: state.breakCount,
        date: new Date(),
        });

        const todayDate = new Date();
        //* we already pushed today's chart data into the array so we set todayDate to yesterday's date
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
};
