// https://leetcode.com/problems/two-sum/

function twoSum(nums: Array<number>, target: number): Array<number> {
  const numObj: { [key: number]: number } = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (complement in numObj) {
      return [numObj[complement], i];
    }
    numObj[nums[i]] = i;
  }
}

export default twoSum;
exports.twoSum = twoSum;
