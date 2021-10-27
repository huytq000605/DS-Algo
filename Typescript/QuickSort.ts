function quickSort(nums: number[]): void {
	function partition(start: number, end: number) {
		if(start >= end) {
			return
		}
		let pivot = nums[end]
		let j = start - 1; // j is the last index where nums[j] < pivot
		for(let i = start; i <= end; i++) {
			if(nums[i] < pivot) {
				j++
				[nums[i], nums[j]] = [nums[j], nums[i]]
			}
		}
		j++
		[nums[j], nums[end]] = [nums[end], nums[j]]
		partition(start, j - 1)
		partition(j + 1, end)
	}
    return partition(0, nums.length - 1)
};
