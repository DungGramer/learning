// https://leetcode.com/problems/longest-substring-without-repeating-characters/

function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length;

  let start = 0;
  let map = new Map();
  let maxLength = 0;

  for (let i = 0; i < s.length; i++) {
      let p = map.get(s[i]);
      if (p != null && start <= p) {
          start = p + 1;
      }
      map.set(s[i], i);
      maxLength = Math.max(maxLength, i - start + 1)
  }

  return maxLength;
};

export default lengthOfLongestSubstring;
exports.lengthOfLongestSubstring = lengthOfLongestSubstring;