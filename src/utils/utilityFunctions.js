export function findSundays() {
  const now = new Date();
  const lastSun = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  lastSun.setDate(lastSun.getDate() - lastSun.getDay());
  const lastSundayFormatted = lastSun.toLocaleDateString("en-CA");
  const nextSun = new Date(lastSun);
  nextSun.setDate(lastSun.getDate() + 7);
  const nextSundayFormatted = nextSun.toLocaleDateString("en-CA");
  return { lastSunday: lastSundayFormatted, nextSunday: nextSundayFormatted };
}

export function localDateObj(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const localDateObj = new Date(year, month - 1, day);
  return localDateObj;
}

export function twelveHourFormat(timeString) {
  const [hours, minutes] = timeString.split(":");
  let hoursNum = parseInt(hours);
  const ampm = hoursNum >= 12 ? "PM" : "AM";
  hoursNum = hoursNum >= 12 ? hoursNum - 12 : hoursNum;
  hoursNum = hoursNum == 0 ? 12 : hoursNum;
  return `${hours}:${minutes} ${ampm}`;
}

export function handleTitle(name) {
  const hastagIndex = name.indexOf("#");
  let cutIndex = -1;
  if (hastagIndex !== -1) {
    cutIndex = name.indexOf(" ", hastagIndex);
  }
  const trimmedName = cutIndex === -1 ? name : name.slice(0, cutIndex);
  const words = trimmedName.toLowerCase().split(" ");
  const newStr = words
    .map((word) => {
      return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    })
    .join(" ");
  return newStr
    .replace(/\bDm\b/g, "DM")
    .replace(/\bHc\b/g, "HC")
    .replace(/\bTp\b/g, "TP");
}
