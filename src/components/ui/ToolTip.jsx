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
			<span>{children}</span>
		</Tooltip>
	);
};

export default ToolTip;
