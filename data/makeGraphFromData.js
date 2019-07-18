const cytoscape = require('cytoscape')

function formatDataForCytoscape(obj) {
  const nodes = Object.keys(obj)
  const output = []

  nodes.forEach((node) => {
    output.push({
      data: { id: node },
      // a node (ie a vertice)
      // will only have an id
    })

    if (obj[node].dependsOn) {
      const { dependsOn } = obj[node]
      dependsOn.forEach((depName) => {
        output.push({
          data: { id: `[${depName}]-[${node}]`, source: depName, target: node },
          // whereas a link (ie an edge)
          // has a source and target. from this cytoscape
          // infers that this data element should be treated as an edge.
          // we use the convention of [source]-[target]
          // to distinguish vertices from edges when rendering
          // to PIXI
        })
      })
    }
  })

  return output
}

function makeGraph(options, cb) {
  const elements = options.cytoData
  const { nodeObject } = options.sourceData

  const defaultBounds = {
    x1: 10,
    y1: 10,
    w: 1000,
    h: 1000,
  }
  const boundingBox = options.bounds || defaultBounds

  const cy = cytoscape({
    elements,
    style: options.style,
    layout: {
      boundingBox,
      name: 'cose',
      stop: () => {
        // when cytoscapes compound spring embedding algorithm
        // stops, we record the calculated positions from the
        // generated data back into the original node object.
        // the original node object does not have entries for edges
        // so we loop through any dependencies and create an edge entry
        // for each dependency and give it a startX, startY, endX, endY
        // and distance for easy rendering calculations
        cy.nodes().positions((n) => {
          const id = n.id()
          const pos = n.position()
          nodeObject[id].x = pos.x
          nodeObject[id].y = pos.y
        })

        const nodeNames = Object.keys(nodeObject)
        nodeNames.forEach((name) => {
          const obj = nodeObject[name]
          if (obj.dependsOn) {
            const { dependsOn } = obj
            dependsOn.forEach((dep) => {
              const x2 = nodeObject[dep].x
              const y2 = nodeObject[dep].y
              const x1 = obj.x
              const y1 = obj.y
              const edgeName = `[${dep}]-[${name}]`
              const distance = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))

              nodeObject[edgeName] = {
                startX: x2,
                startY: y2,
                endX: x1,
                endY: y1,
                distance,
              }
            })
          }
        })

        cb(nodeObject)
        // callback with the modified source object
        // (contains proper coordinates, and distances)
      },
    },
    headless: true,
  })
}

function makeGraphFromData(opts, cb) {
  const options = { ...opts }
  const { data } = options
  delete options.data

  const sourceData = data
  const cytoData = formatDataForCytoscape(sourceData)
  options.sourceData = sourceData
  options.cytoData = cytoData
  makeGraph(options, cb)
}


module.exports = {
  makeGraph,
  makeGraphFromData,
  formatDataForCytoscape,
}
