// https://leetcode.com/problems/trapping-rain-water/submissions/

function trap(height: number[]): number {
  let result = 0;
  const length = height.length;

  for (let i = 1; i < length - 1; ++i) {
    let left = height[i];

    for (let j = 0; j < i; ++j) {
      left = Math.max(left, height[j]);
    }

    let right = height[i];
    for (let j = i + 1; j < length; ++j) {
      right = Math.max(right, height[j])
    }

    result += Math.min(left, right) - height[i];
  }

  return result;
}

export default trap;
exports.trap = trap;