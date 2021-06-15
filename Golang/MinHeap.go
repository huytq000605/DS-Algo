package MinHeap

import "errors"

type MinHeap struct {
	arr []int
}

func (this *MinHeap) Insert(val int) {
	this.arr = append(this.arr, val)
	this.bubbleUp()
	return
}

func (this *MinHeap) Pop() int {
	pop := this.arr[0]
	this.arr[len(this.arr)-1], this.arr[0] = this.arr[0], this.arr[len(this.arr)-1]
	this.arr = this.arr[:len(this.arr)-1]
	this.bubbleDown()
	return pop
}

func (this *MinHeap) Peek() (error, int) {
	if len(this.arr) > 0 {
		return nil, this.arr[0]
	} else {
		return errors.New("There is no number in heap"), 0
	}

}

func (this *MinHeap) bubbleDown() {
	current := 0
	for current <= len(this.arr)-1 {
		leftChild := current*2 + 1
		if leftChild > len(this.arr)-1 {
			return
		}
		rightChild := current*2 + 2
		if rightChild > len(this.arr)-1 {
			if this.arr[current] > this.arr[leftChild] {
				this.arr[current], this.arr[leftChild] = this.arr[leftChild], this.arr[current]
				current = leftChild
				continue
			}
			return
		}
		compare := 0
		if this.arr[leftChild] < this.arr[rightChild] {
			compare = leftChild
		} else {
			compare = rightChild
		}
		if this.arr[current] > this.arr[compare] {
			this.arr[current], this.arr[compare] = this.arr[compare], this.arr[current]
			current = compare
		} else {
			return
		}
	}
}

func (this *MinHeap) bubbleUp() {
	current := len(this.arr) - 1
	for current > 0 {
		parent := (current - 1) / 2
		if this.arr[current] < this.arr[parent] {
			this.arr[current], this.arr[parent] = this.arr[parent], this.arr[current]
			current = parent
		} else {
			return
		}
	}
}
