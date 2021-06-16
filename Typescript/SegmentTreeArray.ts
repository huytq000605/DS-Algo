class SegmentTree { // Max of range
	tree: number[]
	lazy: number[]

	constructor(array: number[]) {
		this.tree = Array(4*array.length).fill(0)
		this.lazy = Array(4*array.length).fill(0)
        this.build(0, array, 0, array.length)
		
	}

	build(index: number, array: number[], start: number, end: number) {
		if(start == end) {
			this.tree[index] = array[start] 
            return
		}
		const middle = start + Math.floor((end-start)/2)
		this.build(index * 2 + 1, array, start, middle);
		this.build(index * 2 + 2, array, middle + 1, end);
		this.tree[index] = Math.max(this.tree[index*2], this.tree[index*2+1])

	}

	query(index: number, treeStart: number, treeEnd: number, start: number, end: number): number {
		if (start > treeEnd || end < treeStart) {
			return 0
		}
		if(start <= treeStart && end >= treeEnd) {
			return this.tree[index] 
		}
		const middle = treeStart + Math.floor( (treeEnd - treeStart) / 2)
		this.down(index)
		const left = this.query(index * 2 + 1, treeStart, middle, start, end)
		const right = this.query(index * 2 + 2, middle + 1, treeEnd, start, end)
		return Math.max(left, right)
	}

	update(index: number, treeStart: number, treeEnd: number, start: number, end: number, value: number) {
		if (start > treeEnd || end < treeStart) {
			return
		}
		if(start <= treeStart && end >= treeEnd) {
			this.tree[index] += value
			this.lazy[index] += value
            return
		}
		const middle = treeStart + Math.floor( (treeEnd - treeStart) / 2)
		this.down(index)

		this.update(index * 2 + 1, treeStart, middle, start, end, value)
		this.update(index * 2 + 2, middle + 1, treeEnd, start, end, value)

		this.tree[index] = Math.max(this.tree[index * 2 + 1], this.tree[index * 2 + 2]) 
	}

	down(index: number) {
		this.tree[index * 2 + 1] += this.lazy[index] 
		this.lazy[index * 2 + 1] += this.lazy[index]
		this.tree[index * 2 + 2] += this.lazy[index] 
		this.lazy[index * 2 + 2] += this.lazy[index]
		this.lazy[index] = 0
	}
}
