// import the Building class
const Building = require('./building.js')
const { delivery_routh_optimization } = require('./utils.js')

// create sample data, for testing
// for testing i created 5 Building objects, one of them is the starting
// building
// object for edge case
const startB = new Building('start')
const startBuilding =  new Building('start') 
const buildingA = new Building('A') 
const buildingB = new Building('B') 
const buildingC = new Building('C') 
const buildingD = new Building('D') 

// create the adjacencies for each building
startBuilding.addAdjacent([
  { building: buildingA, distance: 1 },
  { building: buildingB, distance: 2 },
  { building: buildingC, distance: 2 },
  { building: buildingD, distance: 4 }
])

buildingA.addAdjacent([
  { building: startBuilding, distance: 1 },
  { building: buildingB, distance: 3 },
  { building: buildingC, distance: 6 },
  { building: buildingD, distance: 5 }
])

buildingB.addAdjacent([
  { building: startBuilding, distance: 2 },
  { building: buildingA, distance: 3 },
  { building: buildingC, distance: 4 },
  { building: buildingD, distance: 7 }
])

buildingC.addAdjacent([
  { building: startBuilding, distance: 2 },
  { building: buildingA, distance: 6 },
  { building: buildingB, distance: 4 },
  { building: buildingD, distance: 8 }
])
buildingD.addAdjacent([
  { building: startBuilding, distance: 4 },
  { building: buildingA, distance: 5 },
  { building: buildingB, distance: 7 },
  { building: buildingC, distance: 8 }
])

const buildings = [
  buildingA,
  buildingB,
  buildingC,
  buildingD
]

// feed the startBuilding and list of Buildings to our function which we import
// from the './utils.js' file
 delivery_routh_optimization(buildings, startBuilding)

// edgecase -> uncomment the below code 
// delivery_routh_optimization(buildings, startB)
