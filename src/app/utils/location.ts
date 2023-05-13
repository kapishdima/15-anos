// TODO: Replace this when migrate to browser router
export const UrlSearchParams = () => {
  const hash = window.location.hash;
  const searchParams = hash.substring(3).split('&');

  const urlSearchParams = new Map();

  for (const param of searchParams) {
    const [key, value] = param.split('=');

    urlSearchParams.set(key, JSON.parse(value));
  }

  return urlSearchParams;
};
