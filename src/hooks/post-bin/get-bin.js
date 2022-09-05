import { useEffect, useState } from "react";

/**
 * This function provides a post bin
 */

const getBinFromLocal = () => {
  // Current Timestamp
  const now = new Date().getTime();

  // Look in localStorage for binId
  const localBinObj = localStorage.getItem("bin");
  if (!localBinObj) {
    return null;
  }

  const parsedBinObj = JSON.parse(localBinObj);

  // If the bin is expired return null
  if (now > parsedBinObj.expires) {
    return null;
  }

  return parsedBinObj;
};

const fetchNewBin = async () => {
  return fetch("https://www.toptal.com/developers/postbin/api/bin").then(
    (res) => {
      
    }
  );
};

export const useGetBin = () => {
  // Setup state for storing the bin ID
  const [bin, setBin] = useState(null);

  useEffect(() => {
    if (!bin) {
      (async () => {
        const localBin = getBinFromLocal();
        if (localBin) {
          setBin(localBin);
        }

        const newBin = await fetchNewBin();
      })();
    }
  }, []);

  return bin;
};
