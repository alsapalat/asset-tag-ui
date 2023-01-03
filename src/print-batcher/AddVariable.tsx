import { useState } from 'react'
import { useBatchSelector } from './context';

type Props = {
  onAdd: (v: string) => void,
  label: string
}

function AddVariable({
  label,
  onAdd,
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
      <button className="bg-slate-500 text-white text-sm whitespace-nowrap px-4" type="button" onClick={handleAdd}>
        {label}
      </button>
    </div>
  )
}

export default AddVariable