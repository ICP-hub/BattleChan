
const Constant = () => {

  // Convert Nano Seconds To TimeStamp
  const convertNanosecondsToTimestamp = (nanoseconds: bigint | undefined) => {
    try {
      if (nanoseconds === undefined) {
        return "";
      }

      const milliseconds = Number(nanoseconds) / 1000000; // Convert nanoseconds to milliseconds
      const date = new Date(milliseconds); // Convert milliseconds to a Date object

      // Get the month, day, year, hour, and minute from the Date object
      const month = date.toLocaleString("default", { month: "short" }); // Short month name (e.g., Jan)
      const day = date.getDate(); // Day of the month (1-31)
      const year = date.getFullYear(); // Full year (e.g., 2023)
      const hour = date.getHours(); // Hour (0-23)
      const minute = date.getMinutes(); // Minute (0-59)

      // Format the timestamp string
      const timestamp = `${month} ${day},${year}; ${hour}:${minute < 10 ? "0" + minute : minute
        }`;

      return timestamp.toString();
    } catch (err) {
      console.error("Error: ", err);
      return "";
    }
  };

  // Returns
  return { convertNanosecondsToTimestamp };
};

export default Constant;
