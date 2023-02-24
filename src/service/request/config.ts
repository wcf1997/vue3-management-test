
let BASE_URL = "";
const TIME_OUT = 60000;
const ContentType = "application/json;application/x-www-form-urlencoded";
if (import.meta.env.DEV) {
  
  BASE_URL = import.meta.env.VITE_BASE_URL as string;
} else {
  BASE_URL = "";
}

export { BASE_URL, TIME_OUT, ContentType };
