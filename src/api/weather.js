import axios from "axios";
import PCVN from "pc-vn";

const config = {
  key: `90d4f0f8839ec8444bb5fb9a96c5d6c8`,
  base: `https://api.openweathermap.org/data/2.5`,
};

const GET_FORECAST_WEATHER = async (
  country = "vietnam",
  countryCode = "vn"
) => {
  try {
    const province = await PCVN.getProvinces();
    const response = await axios.get(
      `${config.base}/forecast?q=${country},${countryCode}&lang=vi&appid=${config.key}`
    );
    console.log("GET_FORECAST_WEATHER", province, response);
  } catch (error) {}
};

export default { GET_FORECAST_WEATHER };
