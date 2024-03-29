const yaml = require('js-yaml')
const fs = require('fs')


const has = Object.prototype.hasOwnProperty

function getAllFileNames(path) {
  const fileNames = []
  const dirContents = fs.readdirSync(path)
  dirContents.forEach((str) => {
    if (str.indexOf('.') === -1) {
      // no dot found, assume it is a folder
      fileNames.push(...getAllFileNames(`${path}/${str}`))
    } else if (str.indexOf('.yaml') !== -1 || str.indexOf('.yml') !== -1) {
      // only add file if it is a yaml file
      fileNames.push(`${path}/${str}`)
    }
  })

  return fileNames
}


try {
  const fileNames = getAllFileNames(`${__dirname}/lessons`)
  const nodeObj = {}
  fileNames.forEach((fname) => {
    const doc = yaml.safeLoad(fs.readFileSync(fname))

    const {
      name,
      description,
      lesson,
      prerequisites,
      substitutions,
    } = doc

    nodeObj[name] = {
      description,
      lesson,
      substitutions,
      prerequisites,
    }


    const prerequisiteKeys = Object.keys(prerequisites)

    if (prerequisiteKeys.length > 0) {
      nodeObj[name].dependsOn = prerequisiteKeys
      prerequisiteKeys.forEach((prereq) => {
        if (!has.call(nodeObj, prereq)) {
          nodeObj[prereq] = {}
          // we want to create the prerequisite object here
          // incase the prerequisite doesnt actually exist, we still
          // want to render a node with that label
        }
      })
    }
  })

  fs.writeFileSync(`${__dirname}/nodeData.json`, JSON.stringify(nodeObj), { encoding: 'UTF-8' })
} catch (e) {
  console.log(e)
}
