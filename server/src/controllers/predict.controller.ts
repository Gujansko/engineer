import { Request, Response } from "express";
import { getPredictions } from "../services/predict.service.ts";
import { PredictRequestBody } from "@models/requests/predict-request-body.type.ts";
import { PredictResponseBody } from "@models/responses/predict-response-body.type.ts";

export const predictController = async (
  req: Request<any, any, PredictRequestBody>,
  res: Response<PredictResponseBody>
) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Request body must be an array" });
    }

    const predictions = await getPredictions(req.body);
    res.json(predictions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
