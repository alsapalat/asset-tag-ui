import React, { useCallback, useContext, useMemo, useState } from "react";
import usePersistState from "./usePersistState";

export const BatchContext = React.createContext<any>(null);

interface IProps {
  children: React.ReactNode
}

const useBatchState = () => {
  const { setState } = useContext(BatchContext);
  const patch = useCallback((obj: any) => {
    setState((v: any) => ({
      ...v,
      ...obj
    }))
  }, [setState]);
  return { patch, setState };
}

function useBatchSelector<T>(selector: (v: any) => T) {
  const { state, setState } = useContext(BatchContext);
  const value = useMemo(() => selector(state), [state]);
  return value;
}

const Provider = ({ children }: IProps) => {
  // const [state, setState] = useState<any>({});
  const [state, setState] = usePersistState<any>('temp', {});
  return (
    <BatchContext.Provider value={{ state, setState }}>
      {children}
    </BatchContext.Provider>
  )
}

export {
  Provider,
  useBatchState,
  useBatchSelector,
}
