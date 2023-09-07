export const useThisWeek = (arr = []) => {
    const currentDate = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const formattedDates = [];
    if(arr.length === 0){
      for (let i = 6; i >= 0; i--) {
        const pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - i); // Subtract i days from the current date
  
        const dayIndex = pastDate.getDay(); // Get the day's index (0-6)
        const dayName = daysOfWeek[dayIndex]; // Get the day's name
        const dayOfMonth = pastDate.getDate(); // Get the day's date (1-31)
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(pastDate); // Get the month's abbreviated name
  
        const formattedDate = `(${dayName}) ${dayOfMonth}-${monthName}`;
        formattedDates.push(formattedDate);
      }
    }else{
      for (let i = 0; i <= arr.length - 1; i++) {

        const dayIndex = arr[i].getDay(); // Get the day's index (0-6)
        const dayName = daysOfWeek[dayIndex]; // Get the day's name
        const dayOfMonth = arr[i].getDate(); // Get the day's date (1-31)
        const monthName = new Intl.DateTimeFormat("en-US", {
          month: "short",
        }).format(arr[i]); // Get the month's abbreviated name

        const formattedDate = `(${dayName}) ${dayOfMonth}-${monthName}`;
        formattedDates.push(formattedDate);
      }
    }

    return formattedDates;
}