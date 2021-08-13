export function parseObjToQuery(data: object): string {
  const result = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      const part = `${key}=${value}`;
      result.push(part);
    }
  }
  return result.join("&");
}
