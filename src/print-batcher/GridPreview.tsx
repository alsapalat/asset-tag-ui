import React, { useEffect, useRef, useState } from 'react'
import { useBatchSelector } from './context'
import GridForm from './GridForm'
import { IGridForm } from './types';

type Props = {}

const MAP_PAPER_CLASS = {
  A4: "print-a4 w-[210mm] h-297mm",
  LETTER: "print-letter w-[8.5in] h-[11in]",
}

function GridPreview({}: Props) {
  const [form, setForm] = useState<IGridForm>({
    paper: 'A4',
    columns: 2,
    padding: 0,
    border: '1'
  });
  const printRef = useRef<any>(null);
  const output = useBatchSelector<Array<string>>((v: any) => v?.output || [])
  const handlePrint = () => {
    const mywindow = window.open('', 'PRINT', 'height=600,width=800');
    if (!mywindow) return;
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write(document.head.innerHTML);
    mywindow.document.write('</head><body>');
    mywindow.document.write(printRef.current.outerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  }
  return (
    <div>
      <div className="flex space-x-1">
        <GridForm form={form} setForm={setForm} />
        <div className="flex items-end">
          <button className="btn" type="button" onClick={handlePrint}>Print</button>
        </div>
      </div>
      <div className="p-5 bg-gray-400 rounded shadow-inner mt-3 overflow-auto">
        <div ref={printRef} className={`bg-white table ${MAP_PAPER_CLASS[form.paper]}`}>
          {output.length < 1 ? (
            <div>
              No preview.
            </div>
          ) : output.map((item, i) => (
            <div key={i} className={`inline-block print-block ${form.border === '1' ? 'border border-black ml-[-1px] mt-[-1px]' : ''}`} style={{ width: `${100 / +form.columns}%`, padding: `${form.padding}px` }}>
              <img className="w-full" src={item} alt={`image ${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GridPreview