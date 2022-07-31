# 1-based idx
class FenwickTree:
    def __init__(self, size):
        self.bit = [0 for i in range(size + 1)]
        self.n = size
    
    def update(self, idx, delta):
        while idx <= self.n:
            self.bit[idx] += delta
            idx += idx & -idx
    
    def query(self, idx):
        result = 0
        while idx > 0: 
            result += self.bit[idx]
            idx -= idx & -idx
        return result
    
    def range_sum(self, left, right):
        return self.query(right) - self.query(left - 1)
    
    def range_update(self, left, right, delta):
      self.update(left, delta)
      self.update(right + 1, -delta)
