import React, { useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import QRCode from "react-qr-code";
import { useBatchSelector, useBatchState } from './context';
import { IVariable } from './types';

type Props = {}

interface IDragDiv extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  top: number | string
  left: number | string
  onDragMoveEnd: (coord: { top: number, left: number }) => void,
}

function DragDiv({ children, top, left, onDragMoveEnd, ...props }: IDragDiv) {
  const myRef = useRef<any>(null);
  const isDrag = useRef<boolean>(false);
  const coordStart = useRef<any>({ top: 0, left: 0 });
  const [style, setStyle] = useState({ top, left }) ;
  return (
    <div
      className="absolute z-10 block bg-transparent"
      {...props}
      style={style}
      ref={myRef}
      onMouseDown={(e) => {
        isDrag.current = true
        const coord = {
          top: e.clientY,
          left: e.clientX
        }
        coordStart.current = coord;
      }}
      onMouseMove={(e) => {
        if (!isDrag.current) return
        const coord = {
          top: +top + (e.clientY - coordStart.current.top),
          left: +left + (e.clientX - coordStart.current.left),
        };
        setStyle((s) => ({
          top: +coord.top,
          left: +coord.left
        }));
      }}
      onMouseUp={() => {
        isDrag.current = false
        const el = myRef.current;
        onDragMoveEnd({
          top: +el.offsetTop,
          left: +el.offsetLeft,
        })
      }}
    >
      {children}
    </div>
  )
}

function VariableQr({ data, value, index }: { data: IVariable, value: any, index: number }) {
  const { setState } = useBatchState();
  const handleDragEnd = (coord: any) => {
    setState((state: any) => ({
      ...state,
      variables: (state?.variables || []).map((x: any, i: number) => i === index ? ({
        ...x,
        yPos: coord.top,
        xPos: coord.left,
      }) : x),
    }));
  }
  return (
    <DragDiv key={`${data.xPos}${data.yPos}`} top={data.yPos} left={data.xPos} onDragMoveEnd={handleDragEnd}>
      {value[data.id]
        ? <QRCode value={value[data.id]} size={+data.size} />
        : <div className="flex bg-red-200" style={{ height: `${data?.size}px`, width: `${data?.size}px` }}>
          <span className="m-auto text-xs">QR NOT FOUND</span>
        </div>}
    </DragDiv>
  )
}
function VariableValue({ data, value, index }: { data: IVariable, value: any, index: number }) {
  const { setState } = useBatchState();
  const handleDragEnd = (coord: any) => {
    setState((state: any) => ({
      ...state,
      variables: (state?.variables || []).map((x: any, i: number) => i === index ? ({
        ...x,
        yPos: coord.top,
        xPos: coord.left,
      }) : x),
    }));
  }
  return (
    <DragDiv key={`${data.xPos}${data.yPos}`} top={data.yPos} left={data.xPos} onDragMoveEnd={handleDragEnd}>
      <span className="font-bold" style={{ fontSize: `${data.size}px` }}>{value?.[data.id] || '- NOT FOUND -'}</span>
    </DragDiv>
  )
}

const wait = (t: number) => new Promise((r) => setTimeout(r, t));

function Preview({}: Props) {
  const values = useBatchSelector<Array<any>>((v) => v?.values || []);
  const variables = useBatchSelector<IVariable[]>((v) => v?.variables || []);
  const bg = useBatchSelector<string>((v) => v?.background);

  const [index, setIndex] = useState(0);
  const data = values[index];

  const handlePrev = () => {
    const newIndex = index - 1;
    setIndex(values[newIndex] ? newIndex : values.length - 1);
  }
  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(values[newIndex] ? newIndex : 0);
  }

  const { patch } = useBatchState();

  const handleGenerate = async () => {
    const el = document.getElementById('preview-el');
    if (!el) return;
    const canvas = await html2canvas(el, { allowTaint: false, useCORS: true });
    const out = canvas.toDataURL();
    patch({ output: [out] });
  }

  const handleGenerateBatch = async () => {
    const el = document.getElementById('preview-el');
    if (!el) return;
    const output = [];

    setIndex(0);
    await wait(10);

    for (let i = 0; i < values.length; i += 1) {
      setIndex(i);
      await wait(10);
      const canvas = await html2canvas(el, { allowTaint: false, useCORS: true });
      output.push(canvas.toDataURL());
    }
    patch({ output });
  }

  return (
    <div className="space-y-2">
      <div className="border border-black">
        <div id="preview-el" className="relative">
          {bg
            ? <img className="w-full" src={bg} title="bg preview" />
            : <div className="py-12 text-center text-slate-500 text-sm italic"> Please upload background first</div>}
          {React.Children.toArray((variables).map((item, i) => {
            if (item.type === 'QR') return <VariableQr data={item} value={data} index={i} />
            if (item.type === 'VALUE') return <VariableValue data={item} value={data} index={i} />
            return null;
          }))}
        </div>
      </div>
      {values.length ? <div className="flex justify-between items-center">
        <button className="border py-1 border-slate-400 rounded px-3" onClick={handlePrev}>Prev</button>
        <div>{index + 1 } of {values.length}</div>
        <button className="border py-1 border-slate-400 rounded px-3" onClick={handleNext}>Next</button>
      </div> : null}
      <div className="flex space-x-2">
        <button className="btn w-full" type="button" onClick={handleGenerate} disabled={values.length < 1}>
          Generate
        </button>
        <button className="btn w-full" type="button" onClick={handleGenerateBatch} disabled={values.length < 1}>
          Generate Batch
        </button>
      </div>
    </div>
  )
}

export default Preview