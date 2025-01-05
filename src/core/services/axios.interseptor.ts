import axios from "axios";
class ApiService {
  public JamendoBaseUrl = import.meta.env.VITE_JAMENDO_BASE_URL;
  public PixelBaseUrl = import.meta.env.VITE_PIXEL_BASE_URL;
  PopularTracks(payload: any) {
    console.log(this.JamendoBaseUrl);
    console.log(import.meta.env.VITE_APP_TITLE);

    return axios.get(`${this.JamendoBaseUrl}/tracks`, { params: payload });
  }

  radioStreams(payload: any) {
    return axios.get(`${this.JamendoBaseUrl}/radios/stream`, {
      params: payload,
    });
  }

  backgroundImages(payload: any) {
    console.log();

    return axios.get(`${this.PixelBaseUrl}/search?query=${payload.query}`, {
      headers: {
        Authorization: payload.headers.Authorization,
      },
      params: payload.params,
    });
  }
}

export const apiService = new ApiService();
