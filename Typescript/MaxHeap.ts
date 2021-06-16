class MaxHeap {
    private heap: number[];
    private _length: number;
    constructor() {
        this.heap = [];
        this._length = 0;
    }

	get length() {
		return this._length
	}
	
    public peek() {
		if(this._length > 0)
			return this.heap[0];
		else 
			return undefined
    }
    public push(val: number) {
        this.heap.push(val);
        this._length++;
        this.bubbleUp();
    }
    public pop() {
        [this.heap[0], this.heap[this._length - 1]] = [this.heap[this._length - 1],this.heap[0]]
        const pop = this.heap.pop();
        this._length--;
        this.bubbleDown();
        return pop;
    }
    private bubbleUp() {
        let current = this._length - 1;
        while (current > 0) {
            let parent = Math.ceil(current / 2) - 1;
            if (this.heap[current] > this.heap[parent]) {
				[this.heap[current], this.heap[parent]] = [ this.heap[parent], this.heap[current]];
                current = parent;
            } else {
                return;
            }
        }
    }
    private bubbleDown() {
        let current = 0;
        while (true) {
            let left = current * 2 + 1;
            if (left >= this._length) return;
            let right = left + 1;
            if (right >= this._length) right = left;
            let compare;
            if (this.heap[left] > this.heap[right]) {
                compare = left;
            } else {
                compare = right;
            }
            if (this.heap[compare] > this.heap[current]) {
                [this.heap[compare], this.heap[current]] = [
                    this.heap[current],
                    this.heap[compare],
                ];
                current = compare;
            } else {
                return;
            }
        }
    }
}