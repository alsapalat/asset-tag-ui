import { useState } from 'react'
import { useBatchSelector } from './context';

type Props = {
  onAdd: (v: string) => void,
  label: string,
  disabled?: boolean
}

function AddVariable({
  label,
  onAdd,
  disabled,
}: Props) {
  const columns = useBatchSelector<string[]>((x: any) => x?.columns || []);
  const [selected, setSelected] = useState('');
  const handleAdd = () => {
    onAdd(selected);
  }
  return (
    <div className="flex space-x-[-1px]">
      <select className="form-select w-full" title={label} onChange={(e) => setSelected(e.target.value)} value={selected}>
        <option value="">- Select -</option>
        {columns.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      <button className="btn" type="button" onClick={handleAdd} disabled={disabled || !selected}>
        {label}
      </button>
    </div>
  )
}

export default AddVariable