export function debounce(fn:()=>any, delay = 300) {
  let tiemr:any = null;
  return (...args:[]) => {
    if (tiemr) {
      clearTimeout(tiemr);
    }
    tiemr = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args);
      tiemr = null;
    }, delay);
  };
}
