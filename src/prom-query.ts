export enum PrometheusQueries {
  CPU_CORES = `count(count(node_cpu_seconds_total{instance="$PROM_INSTANCE",job="$PROM_JOB"}) by (cpu))`,
  CPU_FREE_IN_PERCENT = `avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100`,
  CPU_USAGE_IN_PERCENT = `100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)`,
  CPU_TEMPERATURE = `node_hwmon_temp_celsius{instance="$PROM_INSTANCE",job="$PROM_JOB"}`,

  MEMORY_TOTAL_IN_BYTES = `node_memory_MemTotal_bytes{instance="$PROM_INSTANCE",job="$PROM_JOB"}`,
  MEMORY_FREE_IN_BYTES = `node_memory_MemAvailable_bytes{instance="$PROM_INSTANCE",job="$PROM_JOB"}`,
  MEMORY_USED_IN_BYTES = `node_memory_MemTotal_bytes{instance="$PROM_INSTANCE",job="$PROM_JOB"} - node_memory_MemAvailable_bytes{instance="$PROM_INSTANCE",job="$PROM_JOB"}`,
  MEMORY_USAGE_IN_PERCENT = `(1 - (node_memory_MemAvailable_bytes{instance="$PROM_INSTANCE", job="$PROM_JOB"} / node_memory_MemTotal_bytes{instance="$PROM_INSTANCE", job="$PROM_JOB"})) * 100`,

  DISK_READ_SPEED_IN_BYTES = `rate(node_disk_read_bytes_total[1m])`,
  DISK_WRITE_SPEED_IN_BYTES = `rate(node_disk_written_bytes_total[1m])`,
  DISK_TOTAL_IN_BYTES = `node_filesystem_size_bytes{fstype!=""}`,
  DISK_FREE_IN_BYTES = `node_filesystem_free_bytes{fstype!=""}`,
}
