import { useEffect, useState } from "react";
const get = () => (window.location.hash.replace(/^#\/?/, "") || "home");
export function useRoute() {
  const [route, setRoute] = useState(get());
  useEffect(() => {
    const on = () => { setRoute(get()); window.scrollTo({ top: 0 }); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
