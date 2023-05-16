import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from "@mui/material";

interface HeadCell {
  id: string;
  label: string;
  alignRight?: boolean;
}

interface ListHeadProps {
  order: string;
  orderBy: string;
  rowCount: number;
  headLabel: HeadCell[];
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
};

export default function ListHead({ order, orderBy, rowCount, headLabel, numSelected, onRequestSort, onSelectAllClick }: ListHeadProps) {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.alignRight ? "right" : "left"} sortDirection={false}>
            <TableSortLabel hideSortIcon active={orderBy === headCell.id} direction={"asc"} onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? <Box sx={{ ...visuallyHidden }}>{order === "desc" ? "sorted descending" : "sorted ascending"}</Box> : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
