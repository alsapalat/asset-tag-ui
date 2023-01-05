const isEmpty = (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length;

function csvToJson(text: string, quoteChar = '"', delimiter = ','): any[] {
  const rows = text.split('\n')
  const headers = rows[0].split(',')

  const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs')

  const match = (line: any) => [...line.matchAll(regex)]
    .map(m => m[2])
    .slice(0, -1)

  let lines = text.split('\n')
    .filter((x) => !isEmpty(x))
  const heads = headers ?? match(lines.shift())
  lines = lines.slice(1)

  return lines.map(line => {
    return match(line).reduce((acc, cur, i) => {
      // replace blank matches with `null`
      const val = cur.length <= 0 ? null : Number(cur) || cur
      const key = (`${heads[i] ?? '{i}'}`)
        .replace(/"/g, '')
        .trim()
      return { ...acc, [key]: val }
    }, {})
  })
}

export default csvToJson
