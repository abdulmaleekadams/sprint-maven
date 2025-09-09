export type AppConfigType = {
  baseUrlDev: string;
  baseUrlProd: string;
};
export const appConfig: AppConfigType = {
  baseUrlDev: "http://localhost:8080/dev/v1/",
  baseUrlProd: "https://yf7p6xp9gb.execute-api.us-east-1.amazonaws.com/dev/",
};
