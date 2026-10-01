export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    environment: 'vercel',
    timestamp: new Date().toISOString(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY)
  });
}
