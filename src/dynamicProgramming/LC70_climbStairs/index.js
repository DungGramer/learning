function climbStairs(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;

  const cache = Array(n + 1);
  cache[0] = 0;
  cache[1] = 1;
  cache[2] = 2;

  let i = 3;
  while(i <= n) {
    cache[i] = cache[i - 1] + cache[i - 2];
    i++;
  }

  return cache[n];
}

module.exports = climbStairs;
