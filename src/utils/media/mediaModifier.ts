// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject<T = any> = { [key: string]: T };
function mediaModifier<T extends AnyObject>(obj: T | undefined): T {
  if (!obj) throw new Error("Object cannot be undefined.");
  function recursiveAppend(obj: AnyObject): AnyObject {
    if (Array.isArray(obj)) {
      return obj.map((item) => recursiveAppend(item));
    } else if (typeof obj === "object" && obj !== null) {
      const newObj: AnyObject = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (key === "url" && !obj[key].includes("http") && typeof obj[key] === "string") {
            newObj[key] = `${import.meta.env.VITE_STRAPI_URL}${obj[key]}`;
          } else {
            newObj[key] = recursiveAppend(obj[key]);
          }
        }
      }
      return newObj;
    } else {
      return obj;
    }
  }
  // Start the recursion with the input object
  return recursiveAppend(obj) as T;
}
export default mediaModifier;
