import { useState, useRef, useMemo, useEffect } from "react";

export const useHTTPClient = () => {
  // State for storing the fetch status and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Setup a list for storing Abort Controllers
  const activeHttpRequests = useRef([]);

  /**
   * The sendRequest Function is used to send HTTP requests to the provided url
   * It can attach a body with the request. The body should be a js object.
   * The Function will stringify it and attach the correct header
   */
  const sendRequest = useMemo(() => {
    const send =
      (method) =>
      async (url, body = null) => {
        // Set loading state to true
        setIsLoading(true);

        // Trottling the response
        // await new Promise((resolve) =>
        //   setTimeout(() => {
        //     resolve();
        //   }, 2000)
        // );

        // Create an Abort Controller for the request and add it to the list of abort controllers
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        // Setup fetch config method and attach Abort Controller
        const config = {
          method,
          signal: httpAbortCtrl.signal,
        };

        /**
         * If the body is not null and is not a FormData Object, send it as JSON
         * by stringifying it and setting up the correct headers
         * 
         * If the body is a FormData Object, then send it directly
         * The fetch method sets up the correct headers automaticaly
         */
        if (body && !(body instanceof FormData)) {
          config.body = JSON.stringify(body);
          config.headers = {
            "Content-Type": "application/json",
          };
        }
        if (body && body instanceof FormData) {
          config.body = body;
        }

        try {
          // Fetch data
          const response = await fetch(url, config);

          // Remove http abort controller from list of active controllers if the fetch has resolved
          activeHttpRequests.current = activeHttpRequests.current.filter(
            (reqCtrl) => reqCtrl !== httpAbortCtrl
          );

          // Convert to json
          const responseData = await response.json();

          // Throw an error if the response is not ok
          if (!response.ok) {
            throw new Error(responseData.message);
          }

          setIsLoading(false);
          return responseData;
        } catch (err) {
          setIsLoading(false);
          setError(err.message);
          throw err;
        }
      };

    return {
      get: send("GET"),
      post: send("POST"),
      patch: send("PATCH"),
      delete: send("DELETE"),
    };
  }, []);

  // If the component is exiting, abort unresolved http requests
  useEffect(
    () => () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    },
    []
  );

  const clearError = () => setError("");

  return { isLoading, error, sendRequest, clearError };
};
