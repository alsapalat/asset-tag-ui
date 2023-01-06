import BatchForm from "./BatchForm"
import { Provider } from "./context"
import GridForm from "./GridForm"
import GridPreview from "./GridPreview"
import Preview from "./Preview"

type Props = {}

function PrintBatcher({}: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-4">
          <div className="card">
            <BatchForm />
          </div>
        </div>
        <div className="space-y-4">
          <div className="card">
            <Preview />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="card">
          <GridPreview />
        </div>
      </div>
    </>
  )
}

const Wrapper = () => (
  <Provider>
    <PrintBatcher />
  </Provider>
)

export default Wrapper;
