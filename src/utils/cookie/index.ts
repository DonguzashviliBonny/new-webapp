export const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() : undefined;
};

export const setCookie = (name: string, value: string, daysToExpire?: number): void => {
  let cookieString = `${name}=${value}; path=/`;
  if (daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    cookieString += `; ${expires}`;
  }
  document.cookie = cookieString;
};
