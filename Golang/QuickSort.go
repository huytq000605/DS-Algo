package quicksort

func sortColors(nums []int) {
	partition(nums, 0, len(nums)-1)
}

func partition(nums []int, start int, end int) {
	if start >= end {
		return
	}
	j := start - 1
	pivot := nums[end]
	for i := start; i <= end; i++ {
		if nums[i] < pivot {
			j++
			nums[i], nums[j] = nums[j], nums[i]
		}
	}
	nums[end], nums[j+1] = nums[j+1], nums[end]
	partition(nums, start, j)
	partition(nums, j+2, end)
}
