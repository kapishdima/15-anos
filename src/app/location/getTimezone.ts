export const getTimezoneOffset = (tz: string) => {
  const date = new Date();
  const a: any = date.toLocaleString('ja', { timeZone: tz }).split(/[/\s:]/);
  a[1]--;
  const t1 = Date.UTC.apply(null, a);
  const t2 = new Date(date).setMilliseconds(0);
  return (t2 - t1) / 60 / 1000;
};
