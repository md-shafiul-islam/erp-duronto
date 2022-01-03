import axios from "axios";
import { EXT_BASE_URL, REQUEST_HEADER} from "../../actions/types";

export const getRestrictedImage = async (url) => {

    console.log("Current Image Url, ", `${EXT_BASE_URL}${url}`);
  try {
    const response = await axios.get(
      `${EXT_BASE_URL}${url}`,
      {
        headers: REQUEST_HEADER,
        responseType: "arraybuffer",
      }
    );

    let blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    return {image:URL.createObjectURL(blob), status:true, message:"Done"};
  } catch (error) {
    console.log("Image Load Error, ", error);
    return { status: false, message: error.message, image:undefined };
  }
};