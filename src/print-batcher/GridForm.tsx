import { useState } from 'react'
import html2canvas from 'html2canvas';
import { IGridForm } from './types';

type Props = {}

function GridForm({}: Props) {
  const [form, setForm] = useState<IGridForm>({
    padding: 0
  });
  const [images, setImages] = useState<string[]>([]);
  const handleGenerate = () => {
    const el = document.getElementById('preview-el');
    if (!el) return;
    el.style.fontFeatureSettings = '"liga" 0';
    html2canvas(el, { allowTaint: false, useCORS: true }).then((canvas) => {
      setImages([canvas.toDataURL()]);
    })
  }
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
      <button className="bg-slate-500 text-white text-sm whitespace-nowrap px-4 w-full py-3" type="button" onClick={handleGenerate}>
        Generate Batch
      </button>
      {images.map((item, i) => (
        <img key={i} alt="preview" src={item} />
      ))}
    </div>
  )
}

export default GridForm