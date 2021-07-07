class Trie {
    private children: Map<string, Trie>
    private isWord: boolean
    
    constructor() {
        this.children = new Map()
        this.isWord = false
    }
	
	public insert(word: string) {
		let current: Trie = this
		for(let letter of word) {
			if(!current.children.has(letter)) {
				current.children.set(letter, new Trie())
			}
			current = current.children.get(letter)
		}
		current.isWord = true
	}
	
	public has(word: string): boolean {
		let current: Trie = this
		for(let letter of word) {
			if(!current.children.has(letter)) {
				return false
			} else {
				current = current.children.get(letter)
			}
		}
		if(current.isWord) {
			return true
		} else {
			return false
		}
	}

}


export { Trie as default }