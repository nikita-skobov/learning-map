export function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve))
}

export const has = Object.prototype.hasOwnProperty
