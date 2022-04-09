// https://leetcode.com/problems/container-with-most-water/

function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let area = 0;

  while (left < right) {
    area = Math.max(
      area,
      Math.min(height[left], height[right]) * (right - left)
    );

    if (height[left] < height[right]) {
      left++;
    } else right--;
  }

  return area;
}

export default maxArea;
exports.maxArea = maxArea;