// https://leetcode.com/problems/rotate-array/

function rotate(nums: number[], k: number): void {
  while (k--) {
    const last = nums.pop();
    if (last) {
      nums.unshift(last);
    }
  }
}

export default rotate;
exports.rotate = rotate;
