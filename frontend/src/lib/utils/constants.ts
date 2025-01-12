export const now = new Date(Date.now());
export const emailRegex = new RegExp(
  "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
);
export const passwordRegex = new RegExp(
  "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
);
export const fontSizeMap = new Map();
fontSizeMap.set("0.5", "Smallest");
fontSizeMap.set("0.75", "Small");
fontSizeMap.set("1", "Normal");
fontSizeMap.set("1.25", "Large");
fontSizeMap.set("1.5", "Larger");
fontSizeMap.set("1.75", "Very large");
fontSizeMap.set("2", "Largest");

export const fontMap = new Map(); 
fontSizeMap.set("Lilita One", "font-['Lilita_One']")
fontSizeMap.set("Arial", "font-['Arial']")
fontSizeMap.set("Roboto", "font-['Roboto']")
fontSizeMap.set("Merriweather", "font-['Merriweather']")