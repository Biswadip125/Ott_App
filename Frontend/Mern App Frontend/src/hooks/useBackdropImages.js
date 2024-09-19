import axios from "axios";
import { BACKDROP_IMAGE, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getBackdropImages } from "../redux/movieSlice";

const useBackdropImages = async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(BACKDROP_IMAGE, options);

    dispatch(getBackdropImages(res.data.results.slice(0, 5)));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default useBackdropImages;
