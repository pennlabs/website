interface ITableRow {
  label: string
  value?: string | number | boolean
}

const TableRow = ({ label, value }: ITableRow) => {
  if (!value) return null
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}
