import { useEffect, useState } from "react";

export const apiUrl = import.meta.env.VITE_API_URL;

export function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${apiUrl}${url}`);
      const data = await response.json();

      if (Array.isArray(data)) return setData([...data]);

      setData({ ...data });
    }

    fetchData();
  }, [url]);

  return data;
}

export function calculateElapsedTime(t) {
  const hours = Math.floor(t / (1000 * 60 * 60));
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((t % (1000 * 60)) / 1000);

  const result = `${hours > 0 ? hours + " hours, " : ""}${
    minutes > 0 ? minutes + " minutes and " : ""
  }${seconds} seconds.`;
  return { time: t, result };
}
