export function getHref() {
  return location.href;
}

export function getReferrer() {
  return document.referrer;
}

export function getPathname() {
  return location.pathname || "";
}

export function getSearch() {
  return window.location.search || "";
}

export function getOrigin() {
  return window.location.origin || "";
}
