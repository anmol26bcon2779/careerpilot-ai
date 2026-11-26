import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables for dev server
dotenv.config();

// Custom Vite plugin to serve /api serverless functions locally in dev mode
function devApiPlugin() {
  return {
    name: 'dev-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/')) {
          const urlPath = req.url.split('?')[0];
          const route = urlPath.replace('/api/', '');
          
          try {
            // Map route to API handler
            const handlerMap = {
              'ai': './api/ai.js',
              'register': './api/register.js',
              'career-assessment': './api/career-assessment.js',
              'roadmap': './api/roadmap.js',
              'webhook': './api/webhook.js',
              'save-progress': './api/save-progress.js'
            };

            const handlerFile = handlerMap[route];
            if (handlerFile) {
              const fullPath = path.resolve(process.cwd(), handlerFile);
              const module = await import(`file://${fullPath}?t=${Date.now()}`);
              
              // Parse JSON body if present
              let body = {};
              if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
                const buffers = [];
                for await (const chunk of req) {
                  buffers.push(chunk);
                }
                const data = Buffer.concat(buffers).toString();
                if (data) {
                  try {
                    body = JSON.parse(data);
                  } catch (e) {
                    body = data;
                  }
                }
              }

              // Create mock Vercel req/res
              const mockReq = {
                method: req.method,
                url: req.url,
                headers: req.headers,
                query: Object.fromEntries(new URL(req.url, 'http://localhost').searchParams),
                body
              };

              const mockRes = {
                statusCode: 200,
                headers: {},
                status(code) {
                  this.statusCode = code;
                  return this;
                },
                setHeader(name, value) {
                  this.headers[name] = value;
                  res.setHeader(name, value);
                  return this;
                },
                json(data) {
                  res.statusCode = this.statusCode;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return this;
                },
                send(data) {
                  res.statusCode = this.statusCode;
                  res.end(data);
                  return this;
                }
              };

              await module.default(mockReq, mockRes);
              return;
            }
          } catch (err) {
            console.error('API middleware error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
