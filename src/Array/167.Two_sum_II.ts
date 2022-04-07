// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/submissions/

function twoSum (numbers: Array<number>, target: number): Array<number> {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

export default twoSum;
exports.twoSum = twoSum;