export default class DownloadModel {
  buildDownloadUrl(startDate, endDate, dataType) {
    const baseURL =
      dataType === "carbon"
        ? "https://backend-express-production-1aad.up.railway.app/api/carbon/download-range"
        : "https://backend-express-production-1aad.up.railway.app/api/microclimate/download-range";

    return `${baseURL}?start_date=${startDate}&end_date=${endDate}`;
  }
}
