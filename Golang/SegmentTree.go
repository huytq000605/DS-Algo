package SegmentTree

type SegmentTree struct {
	// range
	Start int
	End   int

	//value
	Maximum int
	Lazy    int

	//Tree
	Left  *SegmentTree
	Right *SegmentTree
}

func (this *SegmentTree) Query(s, e int) int {
	if s > this.End || e < this.Start {
		return 0
	}

	if s <= this.Start && e >= this.End {
		return this.Maximum
	}

	this.normalize()
	leftQuery := this.Left.Query(s, e)
	rightQuery := this.Right.Query(s, e)

	if leftQuery > rightQuery {
		return leftQuery
	} else {
		return rightQuery
	}
}

func (this *SegmentTree) Update(s, e, val int) {
	if s > this.End || e < this.Start {
		return
	}
	if s <= this.Start && e >= this.End {
		this.Maximum += val
		this.Lazy += val
		return
	}

	this.normalize()
	this.Left.Update(s, e, val)
	this.Right.Update(s, e, val)

	if this.Left.Maximum > this.Right.Maximum {
		this.Maximum = this.Left.Maximum
	} else {
		this.Maximum = this.Right.Maximum
	}
}

func (this *SegmentTree) normalize() {
	if this.Start < this.End {
		if this.Left == nil || this.Right == nil { // The created have already == Maximum ( has been + Lazy so dont need)
			middle := this.Start + (this.End-this.Start)/2
			this.Left = &SegmentTree{Start: this.Start, End: middle, Maximum: this.Maximum}
			this.Right = &SegmentTree{Start: middle + 1, End: this.End, Maximum: this.Maximum}
		} else if this.Lazy != 0 {
			this.Left.Maximum += this.Lazy
			this.Left.Lazy += this.Lazy
			this.Right.Maximum += this.Lazy
			this.Right.Lazy += this.Lazy
		}
	}
	this.Lazy = 0
}
