import { useEffect, useState } from 'react'
import AddVariable from './AddVariable';
import { useBatchState } from './context';
import { IVariable } from './types';
import VariableItems from './VariableItems';

type Props = {}

function BatchForm({}: Props) {
  const [batchFile, setBatchFile] = useState<any>(null);
  const [bgFile, setBgFile] = useState<any>(null);

  const [cols, setCols] = useState<Array<string>>([]);
  const [values, setValues] = useState<Array<any>>([]);

  const [variables, setVariables] = useState<IVariable[]>([]);
  const handleUploadBatch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    setBatchFile(file);

    // TODO: TEMP
    setCols(['QR_VALUE', 'CONTROL_NUMBER'])
    setValues([
      { QR_VALUE: 'QR0001', CONTROL_NUMBER: 'C0001' },
      { QR_VALUE: 'QR0002', CONTROL_NUMBER: 'C0002' },
      { QR_VALUE: 'QR0003', CONTROL_NUMBER: 'C0003' },
      { QR_VALUE: 'QR0004', CONTROL_NUMBER: 'C0004' },
      { QR_VALUE: 'QR0005', CONTROL_NUMBER: 'C0005' },
      { QR_VALUE: 'QR0006', CONTROL_NUMBER: 'C0006' },
      { QR_VALUE: 'QR0007', CONTROL_NUMBER: 'C0007' },
      { QR_VALUE: 'QR0008', CONTROL_NUMBER: 'C0008' },
      { QR_VALUE: 'QR0009', CONTROL_NUMBER: 'C0009' },
      { QR_VALUE: 'QR0010', CONTROL_NUMBER: 'C0010' },
    ])
  }
  const handleUploadBg = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    setBgFile(file);
  }
  const handleAddQr = (id: string) => {
    setVariables(variables.concat([{ id, type: 'QR', xPos: 0, yPos: 0, size: 100 }]));
  }
  const handleAddValue = (id: string) => {
    setVariables(variables.concat([{ id, type: 'VALUE', xPos: 0, yPos: 0, size: 12 }]));
  }
  const { patch } = useBatchState();
  useEffect(() => {
    patch({ variables, columns: cols, values });
  }, [variables, cols, values]);
  return (
    <div className="space-y-3">
      <label className="block text-sm">
        Batch File (*.csv)
        <input className="form-input w-full" type="file" onChange={handleUploadBatch} title="batch file" accept=".csv" />
      </label>
      <label className="block text-sm">
        Upload Background Template (image file)
        <input className="form-input w-full" type="file" onChange={handleUploadBg} title="batch file" accept="image/*" />
      </label>
      <AddVariable onAdd={handleAddQr} label="Add QR" />
      <AddVariable onAdd={handleAddValue} label="Add Value" />

      <VariableItems onChange={setVariables} value={variables} />
    </div>
  )
}

export default BatchForm