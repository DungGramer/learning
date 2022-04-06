// https://leetcode.com/problems/3sum-closest/

function threeSumClosest(nums: number[], target: number): number {
  if (nums.length < 3) return 0;
  if (nums.length === 3) return nums.reduce((a, b) => a + b);

  nums.sort((a, b) => a - b);

  let result = nums[0] + nums[1] + nums[2];
  let diff = Math.abs(result - target);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === target) {
        return target;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }

      if (Math.abs(sum - target) < diff) {
        result = sum;
        diff = Math.abs(sum - target);
      }
    }
  }

  return result;
}

export default threeSumClosest;
exports.threeSumClosest = threeSumClosest;
