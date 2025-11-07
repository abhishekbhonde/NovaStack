
import { createProxyMiddleware } from "http-proxy-middleware";

export function makeProxy(target: string) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    xfwd: true,
    //@ts-ignore
    onError: (_err, _req, res) => {
      res.status(502).json({ message: "Upstream service unavailable" });
    }
  });
}
