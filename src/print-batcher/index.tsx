import BatchForm from "./BatchForm"
import { Provider } from "./context"
import GridForm from "./GridForm"
import Preview from "./Preview"

type Props = {}

function PrintBatcher({}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="card">
          <BatchForm />
        </div>
        <div className="card">
          <GridForm />
        </div>
      </div>
      <div className="space-y-4">
        <div className="card">
          <Preview />
        </div>
        <div className="card">GRID PREVIEW</div>
      </div>
    </div>
  )
}

const Wrapper = () => (
  <Provider>
    <PrintBatcher />
  </Provider>
)

export default Wrapper;
