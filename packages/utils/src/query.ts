import qs from 'querystring';

export function parseObjToQuery(data: any): string {
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

/**
 *search query 转 对象
 *
 * @export
 * @param {string} searchQuery location.search
 * @return {*}
 */
export function parseSearchQueryToObject(searchQuery: string) {
  return qs.parse(searchQuery);
}
