import { Tooltip, Zoom } from '@mui/material';
import React from 'react';

const ToolTip = ({ title, placement, children }) => {
	return (
		<Tooltip
			title={title}
			placement={placement}
			arrow
			TransitionComponent={Zoom}
		>
			{children}
		</Tooltip>
	);
};

export default ToolTip;
