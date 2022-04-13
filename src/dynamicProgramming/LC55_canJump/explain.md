# 55. Can Jump

Cho 1 mảng `nums`, mỗi số đại diện cho số lượng có thể đi từ vị trí đó.  
Return `true` nếu có thể đi đến cuối mảng.

Example 1:

**Input**: nums = [2,3,1,1,4]  
**Output**: true  
**Explanation**: Nhảy 2 bước tới vị trí 3, từ vị trí 3 nhảy 1 bước tới vị trí 4, nhảy 1 bước tới vị trí cuối.


## Code

```js
function canJump(nums) {
  let goal = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= goal) goal = i;
  }

  return goal === 0;
}
```

## Giải thích
1. Đặt 1 biến `goal`, là vị trí cuối cùng có thể đi được = vị trí cuối cùng của mảng.
2. Vòng lặp for, từ vị trí cuối cùng của mảng đến vị trí đầu tiên.
3. Nếu vị trí đang xét + số lượng đi từ vị trí đang xét lớn hơn vị trí cuối cùng có thể đi được, thì đặt lại vị trí cuối cùng có thể đi được = vị trí đang xét.
4. Nếu vị trí cuối cùng có thể đi được = vị trí đầu tiên, thì return true.

## Lịch sử

```
       |
[3 2 1 1 4]
 0 1 2 3 4

1[3]:
	num:   1
  	index: 3
	goal:  4
	Có thể đến 4, đã đến vị trí cuối cùng



     |
[3 2 1 1 4]
 0 1 2 3 4	

1[2]:
	num:   1
	index: 2
	goal:  3
	Có thể đến 3, nối với vị trí cuối cùng có thể đi được = 3



   |
[3 2 1 1 4]
 0 1 2 3 4	

2[1]:
	num:   2
	index: 1
	goal:  2
	Có thể đến 2, nối với vị trí cuối cùng có thể đi được = 2



 |
[3 2 1 1 4]
 0 1 2 3 4	

3[0]:
	num:   3
	index: 0
	goal:  1
 	Có thể đến 1, nối với vị trí cuối cùng có thể đi được = 1
```