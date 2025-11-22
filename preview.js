import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const port = process.env.PORT || 4173;
const root = process.cwd();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
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

function isPathInsideRoot(path) {
  const normalizedRoot = normalize(root + '/');
  return normalize(path).startsWith(normalizedRoot);
}

createServer((req, res) => {
  const safePath = normalize(req.url.split('?')[0]);
  const target = safePath === '/' ? 'index.html' : safePath.replace(/^\//, '');
  const absolutePath = join(root, target);

  if (!isPathInsideRoot(absolutePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  serveFile(absolutePath, res);
}).listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});
