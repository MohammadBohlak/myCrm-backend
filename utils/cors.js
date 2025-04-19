// utils/cors.js
import Cors from 'cors';

// تهيئة CORS للسماح بجميع المصادر
const cors = Cors({
  origin: '*', // السماح لجميع المواقع
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default cors;