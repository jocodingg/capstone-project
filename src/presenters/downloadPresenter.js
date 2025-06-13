import axios from "axios";
import { format } from "date-fns";
import DownloadModel from "../models/downloadModel";

export default class DownloadPresenter {
  constructor() {
    this.model = new DownloadModel();
  }

  validatePassword(inputPassword) {
    return inputPassword === import.meta.env.VITE_DOWNLOAD_PASSWORD;
  }

  async downloadData({ startDate, endDate, dataType, onSuccess, onError }) {
    try {
      const url = this.model.buildDownloadUrl(startDate, endDate, dataType);
      const response = await axios.get(url, { responseType: "blob" });

      const filename = `${dataType}-data-${format(new Date(), "yyyyMMdd-HHmmss")}.csv`;
      const blob = new Blob([response.data], { type: "text/csv" });

      onSuccess(blob, filename);
    } catch (error) {
      console.error("Download failed:", error);
      onError(error);
    }
  }
}