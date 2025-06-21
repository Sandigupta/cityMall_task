// backend/middleware/rateLimiter.js
import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 30, // Limit each IP to 30 requests per minute
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    error: 'Too many requests. Please slow down and try again shortly.',
  },
});

export default rateLimiter;
