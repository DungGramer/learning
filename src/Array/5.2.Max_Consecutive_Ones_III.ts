// https://leetcode.com/problems/max-consecutive-ones-iii/

function longestOnes(nums: Array<number>, k: number): number {
  let [res, numberOfZeros, left] = [0, 0, 0];

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) {
      numberOfZeros++;
    }

    if (numberOfZeros > k) {
      while (numberOfZeros > k) {
        if (nums[left] === 0) {
          numberOfZeros--;
        }
        left++;
      }
    }

    // think when left = 0, right = 0, the length should be 1
    res = Math.max(res, right - left + 1);
  }

  return res;
}

export default longestOnes;
exports.longestOnes = longestOnes;