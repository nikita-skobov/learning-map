export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export const has = Object.prototype.hasOwnProperty

export function dotProduct(vecU, vecV) {
  // not a 'real' dot product function
  // because it only considers vectors with 2 dimensions
  // but that's all that we need.
  return (vecU[0] * vecV[0]) + (vecU[1] * vecV[1])
}
