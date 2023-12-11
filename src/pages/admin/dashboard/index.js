import MyLineChart from '@components/data/MyLineChart';
import MyPieChart from '@components/data/MyPieChart';

const Dashboard = () => {
	const data1 = [
		{ id: 0, value: 30, label: 'Computers' },
		{ id: 1, value: 45, label: 'Gaming' },
		{ id: 2, value: 20, label: 'Peripherals' },
		{ id: 3, value: 30, label: 'Storage' },
		{ id: 4, value: 15, label: 'Software' },
	];

	const data2 = [
		{ id: 0, value: 55, label: 'Laptop gamer' },
		{ id: 1, value: 48, label: 'Keyboard' },
		{ id: 2, value: 30, label: 'Mouse gamer' },
		{ id: 3, value: 27, label: 'SSD M.2' },
		{ id: 4, value: 16, label: 'Graphic Card' },
	];

	return (
		<>
			<MyPieChart title='Categories' data={data1} />
			<MyPieChart title='Best-selling' data={data2} />
			<MyLineChart />
		</>
	);
};

export default Dashboard;
