package mergeSort

func MergeSort(data []int, resultChannel chan<- []int) {
	if len(data) == 1 {
		resultChannel <- []int{data[0]}
		return
	}
	if len(data) == 0 {
		resultChannel <- []int{}
		return
	}
	mid := len(data) / 2
	newChannel := make(chan []int, 2)
	go MergeSort(data[:mid], newChannel)
	go MergeSort(data[mid:], newChannel)
	first := <-newChannel
	second := <-newChannel
	resultChannel <- merge(first, second)

}

func merge(first, second []int) []int {
	result := make([]int, len(first)+len(second))
	index := 0
	firstIndex := 0
	secondIndex := 0
	for index < len(result) {
		if firstIndex == len(first) {
			result[index] = second[secondIndex]
			secondIndex++
		} else if secondIndex == len(second) {
			result[index] = first[firstIndex]
			firstIndex++
		} else if first[firstIndex] > second[secondIndex] {
			result[index] = second[secondIndex]
			secondIndex++
		} else {
			result[index] = first[firstIndex]
			firstIndex++
		}
		index++
	}
	return result
}
