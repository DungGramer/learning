// https://leetcode.com/problems/4sum/

function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);

            const result: number[][] = [];
  const length = nums.length;

  for (let i = 0; i < length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    for (let j = i + 1; j < length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let left = j + 1;
      let right = length - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          left++;
          right--;
        } else if (sum < target) left++;
        else right--;
      }
    }
  }

  /*   for (let i = 0; i < result.length - 1; ++i) {
    result[i].sort((a, b) => a - b);
    const r = result[i];

    if (r.every((value: number, index: number) => value === result[i + 1][index])) {
      result.splice(i, 1);
      i--;
    }
  }
  return result; */

  return [...new Set(result.map((chunk) => chunk.join(',')))].map(
    (str: string) => str.split(',').map((charNum: string) => parseInt(charNum))
  );
}

export default fourSum;
exports.fourSum = fourSum;
