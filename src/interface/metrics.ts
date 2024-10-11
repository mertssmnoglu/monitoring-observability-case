import { AxiosHeaders } from "axios"

interface IHardwareMetrics {
  cpu: {
    cores: any
    free_in_percent: any
    usage_in_percent: any
    temperature: any
  }
  memory: {
    total_in_bytes: any
    free_in_bytes: any
    used_in_bytes: any
    usage_in_percent: any
  }
  disk: {
    read_speed_in_bytes: any
    write_speed_in_bytes: any
    total_in_bytes: any
    free_in_bytes: any
  }
}

interface IFetchHeaders {
  [key: string]: AxiosHeaders
}

interface IPrometheusQueryResponse {
  status: string
  data: {
    resultType: string
    result: any[]
  }
}

export { IHardwareMetrics, IFetchHeaders, IPrometheusQueryResponse }
