import axios from "axios"
import { PrometheusQueries } from "../prom-query"
import { IHardwareMetrics, IFetchHeaders } from "../interface/metrics"

class HardwareMetricsService {
  private fetchURL: string
  private fetchHeaders: IFetchHeaders
  private job: string
  private instance: string

  constructor(
    fetchURL: string,
    fetchHeaders: IFetchHeaders,
    job: string,
    instance: string
  ) {
    this.fetchURL = fetchURL ?? "http://localhost:9090/api/v1/query"
    this.fetchHeaders = fetchHeaders
    this.job = job
    this.instance = instance
  }

  async query(promqlRawQuery: PrometheusQueries): Promise<number | null> {
    // Replace the placeholders in the query with the actual values
    const promqlQuery = promqlRawQuery
      .replace(/\$PROM_JOB/g, this.job)
      .replace(/\$PROM_INSTANCE/g, this.instance)

    if (!promqlQuery) {
      return null
    }

    try {
      const resp = await axios.get(this.fetchURL, {
        headers: this.fetchHeaders,
        params: {
          query: promqlQuery,
        },
      })

      return Number(resp.data.data.result[0].value[1])
    } catch (error) {
      console.error("Error querying Prometheus:", error)
    }

    return null
  }

  async getAllMetrics(): Promise<IHardwareMetrics> {
    const allMetrics: IHardwareMetrics = {
      cpu: {
        cores: await this.query(PrometheusQueries.CPU_CORES),
        free_in_percent: await this.query(
          PrometheusQueries.CPU_FREE_IN_PERCENT
        ),
        usage_in_percent: await this.query(
          PrometheusQueries.CPU_USAGE_IN_PERCENT
        ),
        temperature: await this.query(PrometheusQueries.CPU_TEMPERATURE),
      },
      memory: {
        total_in_bytes: await this.query(
          PrometheusQueries.MEMORY_TOTAL_IN_BYTES
        ),
        free_in_bytes: await this.query(PrometheusQueries.MEMORY_FREE_IN_BYTES),
        used_in_bytes: await this.query(PrometheusQueries.MEMORY_USED_IN_BYTES),
        usage_in_percent: await this.query(
          PrometheusQueries.MEMORY_USAGE_IN_PERCENT
        ),
      },
      disk: {
        read_speed_in_bytes: await this.query(
          PrometheusQueries.DISK_READ_SPEED_IN_BYTES
        ),
        write_speed_in_bytes: await this.query(
          PrometheusQueries.DISK_WRITE_SPEED_IN_BYTES
        ),
        total_in_bytes: await this.query(PrometheusQueries.DISK_TOTAL_IN_BYTES),
        free_in_bytes: await this.query(PrometheusQueries.DISK_FREE_IN_BYTES),
      },
    }

    return allMetrics
  }
}

export default HardwareMetricsService
