class UnionFind:
    def __init__(self, n):
        self.p = {i:i for i in range(n)}
        self.r = [1] * n
    
    def make(self, x):
        self.p[x] = x
    
    def find(self, x):
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])
        return self.p[x]
    
    def union(self, x, y):
        x_p = self.find(x)
        y_p = self.find(y)
        
        if x_p != y_p:
            if self.r[x_p] < self.r[y_p]:
                x_p, y_p = y_p, x_p
            self.p[y_p] = x_p
            self.r[x_p] += self.r[y_p]