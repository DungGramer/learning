// https://leetcode.com/problems/valid-palindrome/

function isPalindrome(s: string): boolean {
  s = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

export default isPalindrome;
exports.isPalindrome = isPalindrome;