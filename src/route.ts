import { Router, Request, Response } from "express"
import promClient from "prom-client"
import HardwareService from "./service/hardware-metrics"

const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

router.get("/metrics", async (req: Request, res: Response) => {
  const metricRegistry = new promClient.Registry()
  promClient.collectDefaultMetrics({ register: metricRegistry })

  metricRegistry.setDefaultLabels({
    app: "monitoring-observability-case",
  })
  res.setHeader("Content-Type", metricRegistry.contentType)
  res.status(200).send(await metricRegistry.metrics())
})

router.post("/server/data", async (req: Request, res: Response) => {
  const { serverIp } = req.body

  const hardwareService = new HardwareService(
    `http://${serverIp}:9090/api/v1/query`,
    {},
    "node-exporter",
    "node-exporter:9100"
  )

  await hardwareService
    .getAllMetrics()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      console.error("Error querying Prometheus:", err)
      res.status(500).send(err)
    })
})

export default router
