function delivery_routh_optimization(buildings, startBuilding) {

  // edge case if there is no delivery
  if(startBuilding.getAdjacents().length === 0) {
    console.log('Please provide destination buildings');
    return
  }
  // final route variable
  // we use it as visited routes collection, as well when removing adjacent nodes
  let route = { path: [ startBuilding ], distance: 0 }
  // lets first find the shortest path from startNode
  let [ nextBuilding, buildingDistance ] = shortest_path(startBuilding)
  // O(n)
  //
  route.path.push(nextBuilding.building)
  route.distance += buildingDistance 

  // iterate and figure out the next shortest path for each node
 for (let i = 0; i < buildings.length - 1; i++) {
   // remove the visted nodes, from the current node's adjacents list
   remove_adjacent_nodes(nextBuilding.building, route.path)
    // O(n^3)

   // find the shortest path for the next node, and push to the visited /
   // route list
   let [ building, dist ] = shortest_path(nextBuilding.building)
   // O(n^2)
   //
   route.path.push(building.building)
   route.distance += dist
   nextBuilding = building
 }

 // for the finally trip back to the start we can either use the path from the
 // last node or, we can check the distance we traverse to deliver the stuff,
 // and choose the shorter of the two
 let idx = nextBuilding.building.getAdjacents().findIndex(b => b.building.name === startBuilding.name)
 let distance_to_startBuilding_from_lastBuilding = nextBuilding.building.getAdjacents()[idx].distance
  // O(n)

 // depending on the return route choosen we can push the last route, or
 // i think for the return path it is ok to touch the nodes again, to choose
 // the shortest return path  
 if(route.distance > distance_to_startBuilding_from_lastBuilding){
   route.path.push(startBuilding) 
   route.distance += distance_to_startBuilding_from_lastBuilding
 } else {
   for(let i = route.path.length - 2; i >=0; i--) {
     route.path.push(route.path[i])
   }
   // O(n)
   route.distance += route.distance
 }
 return route.path
}

// in the for loop we are running other functions and the time complexity will
//
// O(n) + O(n^3) + O(n^2) + O(n) + O(n) = O(n^3) + O(n^2) + 3 * O(n) => O(n^3)

// find the shortest path from a node to its adjacent nodes, and return the
// adjacent node and its distance
function shortest_path(node) {
  if(node.getAdjacents().length === 0) {
    return node
  }
  let min_distance = node.getAdjacents()[0].distance
  let min_distance_index = 0

  for(let i = 1; i < node.getAdjacents().length; i++) {
    if(min_distance > node.getAdjacents()[i].distance) {
      min_distance = node.getAdjacents()[i].distance
      min_distance_index = i
    }
  }
  // nextNode and the distance to it from a node
  return [ node.getAdjacents()[min_distance_index], min_distance]
}
// seaching the shortest path from a node to each other node is time complexity
// of O(n)

// remove each visited nodes from the current node
// @ nodes - is the visited nodes in other words our route
function remove_adjacent_nodes(from_node, nodes) {
  for(let node of nodes) {
    const idx = from_node.getAdjacents().findIndex(n => {
      return n.building.getName() === node.getName()
    })
    if(idx >= 0) {
      from_node.getAdjacents().splice(idx, 1)
    }
  }

  // the first for loop will loop over each visited nodes which is time
  // complexity of O(n)
  //
  // to remove from from_node we have to also loop through all nodes since each
  // node is linked to each other node so the time complexity is O(n)
  //
  //the splice function also has time complexity of O(n) 
  // therefor the combined time complexity will be O(n^2) + O(n^2) => 
  // 2 * O(n^2)
} 

module.exports = {
  delivery_routh_optimization
}
