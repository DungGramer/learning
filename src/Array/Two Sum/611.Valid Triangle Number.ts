// https://leetcode.com/problems/valid-triangle-number/

function triangleNumber(nums: number[]): number {
  if (nums.length < 3) return 0;

  nums.sort((a, b) => a - b);

  let result = 0;
  let length = nums.length;

  /*   for (let i = 2; i < length; i++) {
    let left = 0, right = i - 1;

    while (left < right) {
      if (nums[left] + nums[right] > nums[i]) {
        result += right - left;
        right--;
      } else {
        left++;
      }
    }
  } */

  /*   for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        if (
          nums[i] + nums[j] > nums[k] &&
          nums[i] + nums[k] > nums[j] &&
          nums[j] + nums[k] > nums[i]
        ) {
          result++;
        }
      }
    }
  } */

  for (let i = 0; i < length - 2; i++) {
    let k = i + 2;

    for (let j = i + 1; j < length; j++) {
      while (k < length && nums[i] + nums[j] > nums[k]) k++;

      if (k > j) result += k - j - 1;
    }
  }

  return result;
}

export default triangleNumber;
exports.triangleNumber = triangleNumber;
