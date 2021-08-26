class DisjointSetNode {
    val: number
    rank: number
    parent: DisjointSetNode
    constructor(val) {
        this.rank = 0
        this.val = val
        this.parent = this
    }
}

class DisjointSet {
    map: Map<any, any>
    
    constructor() {
        this.map = new Map()
    }
    
    makeSet(val: number) {
        let node = new DisjointSetNode(val)
        this.map.set(val, node)
    }
    
    findSet(val: number) {
        if(!this.map.has(val)) return undefined
        let current = this.map.get(val)
        if(current.parent === current) {
            return current
        }
        let parent = this.findSet(current.parent.val)
        current.parent = parent
        return parent
    }
    
    union(val1: number, val2: number) {
        if(!this.map.has(val1) || !this.map.has(val2)) return undefined
        let set1 = this.findSet(val1)
        let set2 = this.findSet(val2)
        if(set1 === set2) {
            return set1
        }
        if(set1.rank === set2.rank) {
            set1.rank++
            set2.parent = set1
            return set1
        }
        if(set1.rank > set2.rank) {
            set2.parent = set1
            return set1
        }
        if(set1.rank < set2.rank) {
            set1.parent = set2
            return set2
        }
    }
    
}