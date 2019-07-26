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

export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i += 1) {
    const arr1i = arr1[i]
    const arr2i = arr2[i]
    if (arr1i !== arr2i) return false
  }

  return true
}
