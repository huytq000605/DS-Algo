class Trie {
	private letter: string
    private children: Map<string, Trie>
    private isWord: boolean
    
    constructor(letter?: string) {
        this.children = new Map()
        this.isWord = false
		this.letter = letter
    }
	
	public insert(word: string) {
		let current: Trie = this
		for(let letter of word) {
			if(!current.children.has(letter)) {
				current.children.set(letter, new Trie(letter))
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
	
	public delete(word: string): boolean {
		if(!this.has(word)) {
			return false
		}
		this._delete(word, -1, null, this)
	}
	
	private _delete(word: string, index: number, parent: Trie | null, current: Trie){
		if(index === word.length) return
		if(index === word.length - 1) {
			current.isWord = false
		}
		this._delete(word, index + 1, current, current.children.get(word[index + 1]))
		if(parent && current.children.size === 0 && current.isWord === false) {
			parent.children.delete(current.letter)
		}
	}

}


export { Trie as default }