import { IGridForm } from './types';

type Props = {
  form: IGridForm
  setForm: React.Dispatch<React.SetStateAction<IGridForm>>
}

function GridForm({ form, setForm }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <label className="block text-sm">
        Print Size
        <select
          className="form-select w-full"
          onChange={(e) => setForm({ ...form, paper: e.target.value as ('A4' | 'LETTER') })}
          title="Paper"
          value={form.paper}

        >
          <option value="A4">A4</option>
          <option value="LETTER">Letter</option>
        </select>
      </label>
      <label className="block text-sm">
        Columns
        <input
          className="form-input w-full"
          type="number"
          onChange={(e) => setForm({ ...form, columns: e.target.value })}
          title="Columns"
          value={form.columns}
        />
      </label>
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
      <label className="block text-sm">
        Border
        <select
          className="form-select w-full"
          onChange={(e) => setForm({ ...form, border: e.target.value as ('1' | '0') })}
          title="Border"
          value={form.border}

        >
          <option value="1">With Border</option>
          <option value="0">Without Border</option>
        </select>
      </label>
    </div>
  )
}

export default GridForm