const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60;

async function fetchNBP(table = 'A', code = 'EUR') {
  const key = `${table}|${code}`;

  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }
}
