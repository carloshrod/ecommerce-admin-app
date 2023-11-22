import { Collapse, List } from '@mui/material';
import useScrollY from '@hooks/useScroll';
import { useState } from 'react';
import { useGlobalContext } from '@contexts/global/GlobalContext';
import SidebarItem from './SidebarItem';
import { sidebarMenu, sidebarUsersMenu } from '@components/consts';

const Sidebar = () => {
	const { hideMenu } = useGlobalContext();
	const { scrollY } = useScrollY();
	const [openCollapseItem, setOpenCollapseItem] = useState(false);

	const handleOpen = () => {
		setOpenCollapseItem(!openCollapseItem);
	};

	return (
		<aside
			className={`sidebar ${hideMenu ? 'sidebar--hide' : null} `}
			id={!hideMenu ? null : 'show'}
		>
			<List component='nav' aria-label='main sidebar'>
				{sidebarMenu
					.filter(item => (scrollY < 70 ? item.label !== 'Logout' : item))
					.map(item => (
						<div key={`sidebar-item-${item.id}`}>
							<SidebarItem
								item={item}
								hideMenu={hideMenu}
								open={openCollapseItem}
								handleOpen={handleOpen}
							/>
							{item.label === 'Users' ? (
								<Collapse in={openCollapseItem} timeout='auto' unmountOnExit>
									{sidebarUsersMenu.map(item => (
										<SidebarItem
											key={`sidebar-users-item-${item.id}`}
											item={item}
											hideMenu={hideMenu}
											open={openCollapseItem}
											handleOpen={handleOpen}
										/>
									))}
								</Collapse>
							) : null}
						</div>
					))}
			</List>
		</aside>
	);
};

export default Sidebar;
