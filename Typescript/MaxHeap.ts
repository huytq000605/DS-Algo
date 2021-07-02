// class HeapNode {
//     word: string;
//     freq: number;
// }

type HeapNode = number

class MaxHeap {
    private heap: HeapNode[];
    constructor() {
        this.heap = [];
    }

    get length() {
        return this.heap.length;
    }

    public peek() {
        if (this.length > 0) return this.heap[0];
        else return undefined;
    }

    public push(val: HeapNode) {
        this.heap.push(val);
        this.bubbleUp();
    }

    public pop() {
        if(this.length === 0) {
            return undefined
        }
        [this.heap[0], this.heap[this.length - 1]] = [
            this.heap[this.length - 1],
            this.heap[0],
        ];
        const pop = this.heap.pop();
        this.bubbleDown();
        return pop;
    }

    private bubbleUp() {
        let current = this.length - 1;
        while (current > 0) {
            let parent = Math.ceil(current / 2) - 1;
            if (this.compare(this.heap[current], this.heap[parent]) == 1) {
                [this.heap[current], this.heap[parent]] = [
                    this.heap[parent],
                    this.heap[current],
                ];
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
            if (left >= this.length) return;
            let right = left + 1;
            if (right >= this.length) right = left;
            let bigger: number;
            if (this.compare(this.heap[left], this.heap[right]) == 1) {
                bigger = left;
            } else {
                bigger = right;
            }
            if (this.compare(this.heap[bigger], this.heap[current]) == 1) {
                [this.heap[bigger], this.heap[current]] = [
                    this.heap[current],
                    this.heap[bigger],
                ];
                current = bigger;
            } else {
                return;
            }
        }
    }

    private compare(node1: HeapNode, node2: HeapNode): number {
        if (node1 > node2) {
            return 1;
        }
        if (node1 == node2) {
            return 0 
        }
        return -1;
    }
}
