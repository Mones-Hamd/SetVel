import { useState } from "react";


const useFetch = (route,  onReceived, onError) => {
  
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => {
    controller.abort();
  };

  if (route.includes("api/")) {
 
    throw Error(
      "when using the useFetch hook, the route should not include the /api/ part"
    );
  }

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Add any args given to the function to the fetch function
  const performFetch = (options) => {
    setError(null);
    setIsLoading(true);
    setIsSuccess(false);

    const baseOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    const fetchData = async () => {
      // We add the /api subsection here to make it a single point of change if our configuration changes
      const url = `http://127.0.0.1:8000/api${route}`;

      const res = await fetch(url, { ...baseOptions, ...options, signal });

      if (!res.ok) {
        setError(
          `Fetch for ${url} returned an invalid status (${
            res.status
          }). Received: ${JSON.stringify(res)}`
        );
      }

      const jsonResult = await res.json();
  
      if (jsonResult.success === true) {
         setIsSuccess(true);
        await onReceived(jsonResult);

      } else {
        setError(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(
              jsonResult
            )}`
        );
        onError(jsonResult);
      }

      setIsLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  };

  return { isLoading, isSuccess, error, performFetch, cancelFetch };
};

export default useFetch;