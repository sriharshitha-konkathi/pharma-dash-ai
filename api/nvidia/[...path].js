export default async function handler(req, res) {
  // Rebuild the NVIDIA API path
  // req.url might be /api/nvidia/v1/chat/completions
  const nvidiaPath = req.url.replace(/^\/api\/nvidia/, "");
  const targetUrl = `https://integrate.api.nvidia.com${nvidiaPath}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization,
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: `Proxy request failed ${error}` });
  }
}
