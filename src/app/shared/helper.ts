export function generatePassword(date, email) {
  let username = email.split("@")[0];
  const dob = new Date(date);
  return `${dob.getFullYear()}-${dob.getMonth() + 1}-${dob.getDate()}-${username}`;
}

export function getDateString(dateString) {
  let date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function convertToBoolProperty(val: any): boolean {
  if (typeof val === "string") {
    val = val.toLowerCase().trim();

    return val === "true" || val === "";
  }

  return !!val;
}
