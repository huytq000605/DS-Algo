function mergeSort(data: number[]): number[] {
    if(data.length == 1) {
        return [data[0]]
    }
    if(data.length === 0) {
        return []
    }
    let mid = (data.length / 2) | 0
    let left = mergeSort(data.slice(0, mid))
    let right = mergeSort(data.slice(mid))
    return merge(left, right);
}

function merge(first: number[], second: number[]): number[] {
    let result = Array(first.length + second.length) 
	let index = 0
	let firstIndex = 0
	let secondIndex = 0
	while (index < first.length + second.length) {
		if (firstIndex == first.length) {
			result[index] = second[secondIndex]
			secondIndex++
		} else if (secondIndex == second.length) {
			result[index] = first[firstIndex]
			firstIndex++
		} else if (first[firstIndex] > second[secondIndex]) {
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