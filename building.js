class Building {
  constructor(name) {
    this.name = name
    this.adjacents = []
  }
  addAdjacent(node){
    this.adjacents.push(...node)
  }
  getName(){
    return this.name
  }
  getAdjacents(){
    return this.adjacents
  }
}

module.exports = Building
