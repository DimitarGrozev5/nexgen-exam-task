import { useGetBin } from "./get-bin";

/**
 * The PostBinController handles communication with the post bin service I will be using
 */
export const usePostBinController = () => {
  const bin = useGetBin();
};
