function uniquePaths(m, n) {
  const dpMatrix = new Array(m).fill(new Array(n).fill(1));

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      dpMatrix[row][col] = dpMatrix[row - 1][col] + dpMatrix[row][col - 1];
    }
  }

  return dpMatrix[m - 1][n - 1];
}

module.exports = uniquePaths;
