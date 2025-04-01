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
