# Monitoring & Observability Case

This project is a simple example of monitoring and observability using Prometheus and Grafana.

## Table of contents

- [Monitoring \& Observability Case](#monitoring--observability-case)
  - [Table of contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Grafana Dashboards](#grafana-dashboards)
  - [License](#license)

## Prerequisites

- Docker
- Docker Compose

## Getting Started

To start the project, run the following command in the root directory:

```bash
docker-compose up -d
```

| Service                  | URL                                            | Credentials                        |
| ------------------------ | ---------------------------------------------- | ---------------------------------- |
| Prometheus               | [http://localhost:9090](http://localhost:9090) | -                                  |
| Grafana                  | [http://localhost:9000](http://localhost:9000) | User: `admin`<br>Password: `admin` |
| Prometheus Node Exporter | [http://localhost:9100](http://localhost:9100) | -                                  |
| Cadvisor                 | [http://localhost:8080](http://localhost:8080) | -                                  |
| Otel Collector           | [http://localhost:8889](http://localhost:8889) | -                                  |
| ClickHouse               | [http://localhost:8123](http://localhost:8123) | User: `test`<br>Password: `1234`   |

---

## Grafana Dashboards

| Dashboard ID | Name                                         | Link                                                                                                               |
| ------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1860         | Node Exporter Full                           | [View Dashboard 1860](https://grafana.com/grafana/dashboards/1860-node-exporter-full/)                             |
| 10826        | Go Metrics                                   | [View Dashboard 10826](https://grafana.com/grafana/dashboards/10826-go-metrics/)                                   |
| 15983        | OpenTelemetry Collector                      | [View Dashboard 15983](https://grafana.com/grafana/dashboards/15983-opentelemetry-collector/)                      |
| 21743        | cAdvisor Exporter Docker Containers Overview | [View Dashboard 21743](https://grafana.com/grafana/dashboards/21743-cadvisor-exporter-docker-containers-overview/) |
| -            | ClickHouse Data Analysis                     | [View JSON](./grafana/dashboards/clickhouse-data-analysis.json)                                                    |
| -            | ClickHouse Query Analysis                    | [View JSON](./grafana/dashboards/clickhouse-query-analysis.json)                                                   |

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details.
