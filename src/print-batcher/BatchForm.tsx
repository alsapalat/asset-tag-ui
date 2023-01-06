import { useEffect, useRef, useState } from 'react'
import AddVariable from './AddVariable';
import { useBatchSelector, useBatchState } from './context';
import csvToJson from './csvToJson';
import { IVariable } from './types';
import VariableItems from './VariableItems';

type Props = {}

function BatchForm({}: Props) {
  const [bg, setBg] = useState<string | null>(null);

  const [cols, setCols] = useState<Array<string>>([]);
  const [values, setValues] = useState<Array<any>>([]);

  const variables = useBatchSelector<IVariable[]>((v) => v?.variables || []);
  const { patch } = useBatchState();

  const handleUploadBatch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;
    const reader = new FileReader()
    reader.onload = () => {
      if (!reader.result) return
      const result = reader?.result as string
      const p = csvToJson(result)
      setValues(p);
      setCols(Object.keys(p[0]));
    }
    // start reading the file. When it is done, calls the onload event defined above.
    reader.readAsBinaryString(file)
  }
  const handleUploadBg = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) return;
      const result = reader?.result as string
      setBg(result)
    }
    reader.readAsDataURL(file);
  }
  const handleAddQr = (id: string) => {
    patch({ variables: variables.concat([{ id, type: 'QR', xPos: 0, yPos: 0, size: 100 }]) });
  }
  const handleAddValue = (id: string) => {
    patch({ variables: variables.concat([{ id, type: 'VALUE', xPos: 0, yPos: 0, size: 12 }]) });
  }
  useEffect(() => {
    if (true) return;
    patch({ columns: cols, values, background: bg });
  }, [cols, values, bg]);
  return (
    <div className="space-y-3">
      <label className="block text-sm relative">
        Batch File (*.csv)
        <input className="form-input w-full" type="file" onChange={handleUploadBatch} title="batch file" accept=".csv" />
        {values.length ? <div className="absolute right-[12px] top-[33px]">
          <div className="bg-slate-500 text-white font-bold px-3 rounded">
            {values.length} row/s
          </div>
        </div> : null}
      </label>
      <div className="relative">
        <label className="block text-sm">
          Upload Background Template (image file)
          <input id="input-bg" className="form-input w-full" type="file" onChange={handleUploadBg} title="batch file" accept="image/*" />
        </label>
        {bg ? <div className="absolute right-[12px] top-[34px]">
          <button className="font-bold text-red-600" type="button" onClick={() => {
            setBg(null);
            const el = document.getElementById('input-bg') as any;
            if (!el) return;
            el.value = "";
          }}>Clear</button>
        </div> : null}
      </div>
      <AddVariable onAdd={handleAddQr} label="Add QR" disabled={values.length < 1} />
      <AddVariable onAdd={handleAddValue} label="Add Value" disabled={values.length < 1} />

      <VariableItems onChange={patch} value={variables} />
    </div>
  )
}

export default BatchForm