# Each node true/false

class SegmentTree:
    def __init__(self, start, end, value = False):
        self.start = start
        self.end = end
        self.value = value
        self.have_lazy = False
        self.lazy = False
        self.left = None
        self.right = None
    
    def query(self, start, end):
        if end < self.start or start > self.end:
            return True
        
        if start <= self.start and end >= self.end:
            return self.value
        
        self.down()
        result = self.left.query(start, end) and self.right.query(start, end)
        return result
    
    def update(self, start, end, value):
        if end < self.start or start > self.end:
            return
        
        if start <= self.start and end >= self.end:
            self.value = value
            self.lazy = value
            self.have_lazy = True
            return

        self.down()
        self.left.update(start, end, value)
        self.right.update(start, end, value)
        self.value = self.left.value and self.right.value

    def down(self):
        if self.start != self.end:
            if not self.left:
                mid = self.start + (self.end - self.start) // 2
                self.left = SegmentTree(self.start, mid, self.value)
                self.right = SegmentTree(mid + 1, self.end, self.value)
            else:
                if self.have_lazy:
                    self.left.lazy = self.right.lazy = self.left.value = self.right.value = self.lazy
                    self.left.have_lazy = True
                    self.right.have_lazy = True
        self.have_lazy = False
        
