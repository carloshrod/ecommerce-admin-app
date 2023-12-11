import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const MyLineChart = () => {
	const xLabels = [
		'Jan',
		'Feb',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'Sept',
		'October',
		'Nov',
		'December',
	];

	return (
		<Grid item xs={12}>
			<Card>
				<CardHeader
					title='Sales per month'
					subheader='2023'
					titleTypographyProps={{ variant: 'subtitle1' }}
					subheaderTypographyProps={{ variant: 'subtitle2' }}
				/>
				<CardContent
					sx={{
						display: 'flex',
						py: 2,
						alignItems: 'center',
						'@media (width < 600px )': { height: 300 },
						'@media (width < 400px )': { height: 200 },
					}}
				>
					<LineChart
						xAxis={[{ scaleType: 'point', data: xLabels }]}
						series={[
							{
								data: [45, 79, 102, 67, 120, 55, 93, 156, 133, 88, 169, 245],
								area: true,
								label: 'Sales',
								showMark: false,
							},
						]}
						width={700}
						height={400}
						sx={{
							'.MuiLineElement-root': {
								display: 'none',
							},
							'@media (width < 600px )': { height: '300px !important' },
							'@media (width < 400px )': { height: '200px !important' },
						}}
					/>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default MyLineChart;
