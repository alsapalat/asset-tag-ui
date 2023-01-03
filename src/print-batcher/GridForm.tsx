import { useState } from 'react'
import { IGridForm } from './types';

type Props = {}

function GridForm({}: Props) {
  const [form, setForm] = useState<IGridForm>({
    padding: 0
  });
  return (
    <div className="space-y-3">
      <label className="block text-sm">
        Padding
        <input
          className="form-input w-full"
          type="number"
          onChange={(e) => setForm({ ...form, padding: e.target.value })}
          title="Padding"
          value={form.padding}
        />
      </label>
    </div>
  )
}

export default GridForm