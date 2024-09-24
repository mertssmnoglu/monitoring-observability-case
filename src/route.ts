import { Router, Request, Response } from "express"
import promClient from "prom-client"

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

export default router
