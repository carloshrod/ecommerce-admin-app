import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const MyPieChart = ({ title, data }) => {
	return (
		<Grid item xs={12} md={6}>
			<Card>
				<CardHeader
					title={title}
					titleTypographyProps={{ variant: 'subtitle1' }}
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
					<PieChart
						colors={['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490']}
						series={[
							{
								data,
								innerRadius: 30,
								paddingAngle: 2,
								cornerRadius: 5,
								cx: 120,
								highlightScope: { faded: 'global', highlighted: 'item' },
								faded: {
									innerRadius: 30,
									additionalRadius: -30,
									color: 'gray',
								},
							},
						]}
						width={400}
						height={200}
						sx={{
							'@media (width < 600px )': { height: '300px !important' },
							'@media (width < 400px )': { height: '200px !important' },
						}}
					/>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default MyPieChart;
