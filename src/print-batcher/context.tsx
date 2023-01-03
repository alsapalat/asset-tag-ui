import React, { useCallback, useContext, useMemo, useState } from "react";

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
  return { patch };
}

function useBatchSelector<T>(selector: (v: any) => T) {
  const { state, setState } = useContext(BatchContext);
  const value = useMemo(() => selector(state), [state]);
  return value;
}

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<any>({});
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
