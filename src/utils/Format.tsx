export const formatTime = (time: any) => {
    if (time) {
        const [hour, minute, second] = time.split(":");
        const suffix = +hour >= 12 ? "PM" : "AM";
        const formattedHour = String(+hour % 12 || 12).padStart(2, "0"); // Ensure two digits
        return `${formattedHour}:${minute.padStart(2, "0")} ${suffix}`;
    }
    return "";
};


export const formatDate = (dateString: any) => {
    const date = new Date(dateString); // Convert string to Date object
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year} 12:00:00 AM`;
};

export const formatDateInput = (dateStr: string) => {
    // Split the input string into day, month, and year
    const [day, month, year] = dateStr.split('-');

    // Construct a valid date string in the format 'YYYY-MM-DD'
    const validDateStr = `${year}-${month}-${day}`;

    // Create a new Date object
    const date = new Date(validDateStr);

    // Format the date back to 'YYYY-MM-DD'
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
};

export const formatTimeInput = (timeStr: string) => {

    // Extract hours, minutes, and period (AM/PM) using regex
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) {
        return '';
    }

    let [_, hours, minutes, period] = match;
    let formattedHours = parseInt(hours, 10);

    // Convert hours to 24-hour format
    if (period.toUpperCase() === "PM" && formattedHours !== 12) {
        formattedHours += 12;
    } else if (period.toUpperCase() === "AM" && formattedHours === 12) {
        formattedHours = 0;
    }

    const formattedTime = `${String(formattedHours).padStart(2, '0')}:${minutes}`;
    return formattedTime;
};

export const convertTo24HourFormat = (time: string) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
