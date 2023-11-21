import { TableBody, TableCell, TableRow } from '@mui/material';
import useTable from '@hooks/useTable';
import DataTableRow from './DataTableRow';

const DataTableBody = ({
	rows,
	order,
	orderBy,
	selected,
	page,
	rowsPerPage,
	handleSelectOne,
}) => {
	const { stableSort, getComparator } = useTable(rows);

	const isSelected = id => selected.indexOf(id) !== -1;

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

	return (
		<TableBody>
			{rows?.length > 0 ? (
				<>
					{stableSort(rows, getComparator(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, i) => {
							const isItemSelected = isSelected(row.id);
							const labelId = `enhanced-table-checkbox-${i}`;
							return (
								<DataTableRow
									key={i}
									row={row}
									isItemSelected={isItemSelected}
									labelId={labelId}
									handleSelectOne={handleSelectOne}
								/>
							);
						})}
				</>
			) : (
				<TableRow>
					<TableCell sx={{ fontSize: 50 }} align='center' colSpan={6}>
						¡No data!
					</TableCell>
				</TableRow>
			)}
			{emptyRows > 0 && (
				<TableRow>
					<TableCell colSpan={6} />
				</TableRow>
			)}
		</TableBody>
	);
};

export default DataTableBody;
