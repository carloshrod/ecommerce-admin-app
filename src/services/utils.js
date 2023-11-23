import Swal from 'sweetalert2';

export const SwalConfirm = async text => {
	return await Swal.fire({
		icon: 'question',
		html: text,
		showCancelButton: true,
		confirmButtonColor: '#20cb84',
		confirmButtonText: 'Aceptar',
		cancelButtonColor: '#dc4035',
		cancelButtonText: 'Cancelar',
		width: '24em',
	});
};
