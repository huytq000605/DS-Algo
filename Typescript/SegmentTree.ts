class SegmentTree {
    left: SegmentTree;
    right: SegmentTree;
    start: number;
    end: number;
    k: number;
    lazy: number;

    constructor(s: number, e: number, k: number) {
        this.start = s;
        this.end = e;
        this.k = k;
    }

    query(s: number, e: number): number {
        if (s > this.end || e < this.start) {
            return 0;
        }
        if (s <= this.start && e >= this.end) {
            return this.k;
        }
        this.normalize();
        const leftQuery = this.left.query(s, e);
        const rightQuery = this.right.query(s, e);
        return Math.max(leftQuery, rightQuery);
    }

    update(s: number, e: number, val: number) {
        if (s > this.end || e < this.start) {
            return;
        }
        if (s <= this.start && e >= this.end) {
            this.k += val;
            this.lazy += val;
            return;
        }
        this.normalize();
        this.left.update(s, e, val);
        this.right.update(s, e, val);
        this.k = Math.max(this.left.k, this.right.k);
    }

    normalize() {
        if (this.start < this.end) {
            // not leaf node
            if (!this.left || !this.right) {
                const middle =
                    this.start + Math.floor((this.end - this.start) / 2);
                this.left = new SegmentTree(this.start, middle, this.k);
                this.right = new SegmentTree(middle + 1, this.end, this.k);
            } else if (this.lazy) {
                this.left.k += this.lazy;
                this.left.lazy += this.lazy;
                this.right.k += this.lazy;
                this.right.lazy += this.lazy;
            }
        }
        this.lazy = 0;
    }
}
