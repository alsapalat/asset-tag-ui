import React from 'react'
import { useBatchSelector } from './context'

type Props = {}

function GridPreview({}: Props) {
  const output = useBatchSelector<Array<string>>((v: any) => v?.output || [])
  return (
    <div>
      <div className="grid grid-cols-2">
        {output.length < 1 ? (
          <div>
            No preview.
          </div>
        ) : output.map((item, i) => (
          <img src={item} key={i} alt={`image ${i}`} />
        ))}
      </div>
    </div>
  )
}

export default GridPreview