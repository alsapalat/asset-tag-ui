import React, { useMemo, useState } from 'react'
import QRCode from "react-qr-code";
import { useBatchSelector } from './context';
import { IVariable } from './types';

type Props = {}

function VariableQr({ data, value }: { data: IVariable, value: any }) {
  const calculatePosition = useMemo(() => ({
    top: `${data.yPos}px`,
    left: `${data.xPos}px`,
  }), [data]);
  return (
    <div className="absolute z-10" style={calculatePosition}>
      {value[data.id]
        ? <QRCode value={value[data.id]} size={+data.size} />
        : <div className="flex bg-red-200" style={{ height: `${data?.size}px`, width: `${data?.size}px` }}>
          <span className="m-auto text-xs">QR NOT FOUND</span>
        </div>}
    </div>
  )
}
function VariableValue({ data, value }: { data: IVariable, value: any }) {
  const calculatePosition = useMemo(() => ({
    top: `${data.yPos}px`,
    left: `${data.xPos}px`,
  }), [data]);
  return (
    <div className="absolute z-20" style={calculatePosition}>
      <span className="font-bold" style={{ fontSize: `${data.size}px` }}>{value?.[data.id] || '- NOT FOUND -'}</span>
    </div>
  )
}

function Preview({}: Props) {
  const values = useBatchSelector<Array<any>>((v) => v?.values || []);
  const variables = useBatchSelector<IVariable[]>((v) => v?.variables || []);

  const [index, setIndex] = useState(0);
  const data = values[index];

  const [bg] = useState('https://ucarecdn.com/0089dfa4-a4c9-4547-9df4-beba7517b765/'); // TODO

  const handlePrev = () => {
    const newIndex = index - 1;
    setIndex(values[newIndex] ? newIndex : values.length - 1);
  }
  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(values[newIndex] ? newIndex : 0);
  }

  return (
    <div className="space-y-2">
      <div className="border border-black">
        <div id="preview-el" className="relative">
          <img className="w-full" src={bg} title="bg preview" />
          {React.Children.toArray((variables).map((item) => {
            if (item.type === 'QR') return <VariableQr data={item} value={data} />
            if (item.type === 'VALUE') return <VariableValue data={item} value={data} />
            return null;
          }))}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button className="border py-1 border-slate-400 rounded px-3" onClick={handlePrev}>Prev</button>
        <div>{index + 1 } of {values.length}</div>
        <button className="border py-1 border-slate-400 rounded px-3" onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default Preview