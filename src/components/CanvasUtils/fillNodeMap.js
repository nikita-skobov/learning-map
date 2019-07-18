import { has } from '../../utilities'

export default function fillNodeMap(map, edgeName, spr) {
  let [start, end] = edgeName.split('-')
  start = start.replace('[', '')
  start = start.replace(']', '')
  end = end.replace('[', '')
  end = end.replace(']', '')
  if (has.call(map, end)) {
    map[end].push(spr)
  } else {
    // eslint-disable-next-line
    map[end] = [spr]
  }
  if (has.call(map, start)) {
    map[start].push(spr)
  } else {
    // eslint-disable-next-line
    map[start] = [spr]
  }
}
