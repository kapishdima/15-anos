// TODO: Replace this when migrate to browser router
export const UrlSearchParams = () => {
  const hash = window.location.hash;
  const searchParams = hash.substring(hash.indexOf('?') + 1, hash.length).split('&');
  const urlSearchParams = new Map();

  console.log(searchParams);

  for (const param of searchParams) {
    const [key, value] = param.split('=');

    if (!key || !value) {
      return null;
    }

    urlSearchParams.set(key, JSON.parse(value));
  }

  return urlSearchParams;
};
