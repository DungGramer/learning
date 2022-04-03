// https://leetcode.com/problems/minimum-window-substring/

function minWindow(s: string, t: string): string {
  let charCount = t.length;
  let minLength = Number.MAX_SAFE_INTEGER;
  let minStartIndex = 0;
  const char: { [key: string]: number } = {};

  for (let i = 0; i < t.length; i++) {
    const curr = t[i];
    char[curr] = (char[curr] || 0) + 1;
  }

  for (let l = 0, r = 0; r < s.length; ) {
    if (char[s[r]] > 0) charCount--;
    char[s[r]]--;
    r++;

    while (charCount === 0) {
      if (r - l < minLength) {
        minLength = r - l;
        minStartIndex = l;
      }

      char[s[l]]++;
      if (char[s[l]] > 0) charCount++;
      l++;
    }
  }
  return minLength === Number.MAX_SAFE_INTEGER
    ? ''
    : s.substring(minStartIndex, minStartIndex + minLength);
}

export default minWindow;
exports.minWindow = minWindow;