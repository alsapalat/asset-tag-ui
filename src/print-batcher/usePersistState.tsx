import { useCallback, useRef, useState } from 'react'

export const storage = {
  get: (key: string, value: any) => {
    try {
      const l1 = JSON.parse(sessionStorage.getItem(key) ?? '')
      return typeof l1 === 'string' ? JSON.parse(l1) : l1 || value
    } catch (err) {
      return value
    }
  },
  set: (key: string, newValue: any) => {
    sessionStorage.setItem(key, JSON.stringify(newValue))
  },
  remove: (key: string) => {
    sessionStorage.removeItem(key)
  }
}

function deepEquals(object1: any, object2: any) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEquals(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }
  return true;
}

function isObject(object: Object) {
  return object != null && typeof object === 'object';
}

function usePersistState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState(storage.get(key, defaultValue))
  const currentValue = useRef(storage.get(key, defaultValue))
  const setter = useCallback(
    (newValue: any) => {
      const v =
        typeof newValue === 'function'
          ? newValue(currentValue?.current)
          : newValue
      if (deepEquals(v, currentValue?.current)) return
      storage.set(key, JSON.stringify(v))
      currentValue.current = v
      setState(newValue)
    },
    [key]
  )
  return [state, setter]
}

export default usePersistState;
