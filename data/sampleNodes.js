const obj = {
  statistics: {
    dependsOn: ['notation', 'addition', 'division'],
  },
  addition: {},
  notation: {},
  division: {},
  algebra: {
    dependsOn: ['addition', 'notation', 'division', 'multiplication'],
  },
  multiplication: {
    dependsOn: ['addition'],
  },
  calculus: {
    dependsOn: ['algebra', 'notation'],
  },
  linearAlgebra: {
    dependsOn: ['algebra', 'notation', 'vectors'],
  },
  vectors: {
    dependsOn: ['notation', 'addition', 'graphs'],
  },
  graphs: {
    dependsOn: ['algebra'],
  },
  G: {},
  A: {
    dependsOn: ['C', 'G'],
  },
  B: {
    dependsOn: ['A'],
  },
  C: {
    dependsOn: ['B'],
  },
}

module.exports = obj
