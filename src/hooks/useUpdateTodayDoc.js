import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const updateTodayDoc = async (state, todayDocId, timerStyle) => {
    const { pomodoro, shortBreak, longBreak } = timerStyle;
    let objToUpdate;
    switch (state.isPomodoro) {
    case pomodoro.title:
        objToUpdate = { pomodoroCount: state.pomosCount + 25 };
        break;
    case shortBreak.title:
        objToUpdate = { breakCount: state.breakCount + 5 };
        break;
    case longBreak.title:
        objToUpdate = { breakCount: state.breakCount + 15 };
        break;
    }
    try {
        const todayDocRef = doc(db, "chart", todayDocId);
        await updateDoc(todayDocRef, objToUpdate);
    } catch (error) {
        console.log("error occured during the update of the 'today Doc': ", error);
    }
};
