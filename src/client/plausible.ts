import axios from "axios";

class PlausibleApi {
  private apiUrl = "https://analytics.deepnudes.pro/api/v1/stats";
  private siteId = "deepnudes.pro";
  private defaultHeaders = {
    Authorization: `Bearer ${process.env.SITE_TOKEN}`, // Replace YOUR_TOKEN with your actual token
  };

  async getRealtimeVisitors(): Promise<number> {
    const response = await axios.get(`${this.apiUrl}/realtime/visitors`, {
      headers: this.defaultHeaders,
      params: { site_id: this.siteId },
    });
    return response.data;
  }

  async getAggregateStats(period = "30d", metrics = "visitors,pageviews,bounce_rate,visit_duration"): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/aggregate`, {
      headers: this.defaultHeaders,
      params: { site_id: this.siteId, period, metrics },
    });
    return response.data;
  }

  async getTimeSeriesStats(
    period = "30d",
    metrics = "visitors",
    interval = "month"
  ): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/timeseries`, {
      headers: this.defaultHeaders,
      params: { site_id: this.siteId, period, metrics, interval },
    });
    return response.data;
  }

  async getBreakdownStats(
    period = "30d",
    property = "visit:source",
    metrics = "visitors",
    limit = 5
  ): Promise<any> {
    const response = await axios.get(`${this.apiUrl}/breakdown`, {
      headers: this.defaultHeaders,
      params: { site_id: this.siteId, period, property, metrics, limit },
    });
    return response.data;
  }
}
export const plausibleApi = new PlausibleApi()
