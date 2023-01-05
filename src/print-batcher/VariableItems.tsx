import React from 'react'
import { IVariable } from './types'

type Props = {
  onChange: any
  value: IVariable[]
}

function VariableItems({ onChange, value }: Props) {
  const handleChange = (index: number, key: string) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ variables: value.map((x, i: number) => i === index ? { ...x, [key]: target.value } : x) });
  }
  const handleRemove = (index: number) => () => {
    onChange({ variables: value.filter((x, i: number) => i !== index) });
  }
  return (
    <table className="table table-auto w-full border-collapse border border-slate-500">
      <thead>
        <tr>
          <th>Item/s</th>
          <th style={{ width: '90px' }}>X Pos</th>
          <th style={{ width: '90px' }}>Y Pos</th>
          <th style={{ width: '90px' }}>Size</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {value.map((item, i) => (
          <tr key={i}>
            <td>{item.id}</td>
            <td>
              <input className="form-input w-full" type="number" onChange={handleChange(i, 'xPos')} value={item.xPos} title="xPos" />
            </td>
            <td>
              <input className="form-input w-full" type="number" onChange={handleChange(i, 'yPos')} value={item.yPos} title="yPos" />
            </td>
            <td>
              <input className="form-input w-full" type="number" onChange={handleChange(i, 'size')} value={item.size} title="size" />
            </td>
            <td>
              <button className="text-red-600 font-bold w-full" type="button" title="delete" onClick={handleRemove(i)}>&times;</button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  )
}

export default VariableItems