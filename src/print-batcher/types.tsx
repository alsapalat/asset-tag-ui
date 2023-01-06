export interface IVariable {
  id: string
  type: 'VALUE' | 'QR'
  xPos: number | string
  yPos: number | string
  size: number | string
}

export interface IGridForm {
  paper: 'A4' | 'LETTER'
  columns: number | string
  padding: number | string
  border: '1' | '0'
}
