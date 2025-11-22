import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const port = process.env.PORT || 4173;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
};

async function serveFile(path, res) {
  try {
    const data = await readFile(path);
    const type = mimeTypes[extname(path)] || 'text/plain; charset=utf-8';
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
}

createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    serveFile('index.html', res);
    return;
  }

  if (req.url === '/styles.css') {
    serveFile('styles.css', res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}).listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});
