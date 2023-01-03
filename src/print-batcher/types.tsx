export interface IVariable {
  id: string
  type: 'VALUE' | 'QR'
  xPos: number | string
  yPos: number | string
  size: number | string
}

export interface IGridForm {
  padding: number | string
}
