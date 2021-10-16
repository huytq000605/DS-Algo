class UnionFind {
    parent: Record<number, number>
    length: Record<number, number>
    component: number
    
    constructor() {
        this.parent = {}
        this.component = 0
        this.length = {}
    }
    
    makeSet(val: number) {
        if(this.parent[val] === undefined) {
            this.parent[val] = val
            this.length[val] = 1
            this.component++
        }
    }
    
    find(val: number) {
        if(val !== this.parent[val]) {
            this.parent[val] = this.find(this.parent[val])
        }
        return this.parent[val]
    }
    
    union(val1: number, val2: number) {
        let set1 = this.find(val1)
        let set2 = this.find(val2)
        if(set1 !== set2) {
            if(this.length[set1] < this.length[set2]) {
                [set1, set2] = [set2, set1]
            }
            this.length[set1] = this.length[set1] + this.length[set2]
            this.parent[set2] = set1
            this.component--
        }
    }
    
}