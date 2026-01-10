export const getTimeLeft = (date, time) => {
  if (!date || !time) return "";

  // Convert "10:30 AM" → 24h format
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const targetDate = new Date(date);
  targetDate.setHours(hours, minutes, 0, 0);

  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) return "Expired";

  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) return `${diffMinutes} Min Left`;
  if (diffHours < 24) return `${diffHours} Hrs Left`;
  return `${diffDays} Days Left`;
};

export const formatTimeToAMPM = (time) => {
  if (!time) return "";

  let [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

export const isWithinNext24Hours = (date, time) => {
  if (!date || !time) return false;

  const now = new Date();

  // Parse time
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const taskDate = new Date(date);
  taskDate.setHours(hours, minutes, 0, 0);

  const diff = taskDate - now;

  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
};
