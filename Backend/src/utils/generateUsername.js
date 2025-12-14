export function generateUsername(email) {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
  const randomNum = Math.floor(100 + Math.random() * 900); 
  return base + randomNum;
}
