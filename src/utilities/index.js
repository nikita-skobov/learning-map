/* global document */

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

export function downloadFile(filename, text, mime = 'text/plain') {
  const element = document.createElement('a')
  element.setAttribute('href', `data:${mime};charset=utf-8,${encodeURIComponent(text)}`)
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
