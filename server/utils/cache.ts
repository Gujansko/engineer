import cache from "memory-cache";
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import config from "../../config/config.ts";

const duration = config.cacheDurationSeconds;

const cacheMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    let key = `__expressFootballMatchesScraper__${req.originalUrl || req.url}`;
    if (req.method === "POST" && req.body) {
      const bodyHash = crypto
        .createHash("sha256")
        .update(JSON.stringify(req.body))
        .digest("hex");
      key += bodyHash;
    }
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.info(`Cache hit for ${key}`);
      res.send(cachedResponse);
      return;
    } else {
      const originalSend = res.send.bind(res);
      res.send = (body: any) => {
        if (res.statusCode < 300) {
          cache.put(key, body, duration * 1000);
        }

        return originalSend(body);
      };
      next();
    }
  };
};

export default cacheMiddleware;
