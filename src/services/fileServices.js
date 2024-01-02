import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from 'firebase/storage';
import withEnhances from './withEnhances';

const storage = getStorage();

export const generateImageURL = withEnhances(async (file, id) => {
	const filePath = `avatars/avt-${id}`;
	const reference = ref(storage, filePath);
	await uploadBytes(reference, file);
	return await getDownloadURL(reference);
});

export const generateImagesArray = withEnhances(async (files, id) => {
	const array = [];

	for (let i = 0; i < files.length; i++) {
		const filePath = `product_images/pim-${id}/pim-${id}-${i + 1}`;
		const reference = ref(storage, filePath);
		await uploadBytes(reference, files[i]);
		const url = await getDownloadURL(reference);
		array.push(url);
	}

	return array;
});

export const deleteFile = withEnhances(async id => {
	const filePath = `avatars/avt-${id}`;
	const reference = ref(storage, filePath);
	await deleteObject(reference);
	return 'File deleted successfully!';
});

export const deleteFiles = withEnhances(async id => {
	for (let i = 0; i < 5; i++) {
		const filePath = `product_images/pim-${id}/pim-${id}-${i + 1}`;
		const reference = ref(storage, filePath);
		await deleteObject(reference);
	}
	return 'Files deleted successfully!';
});
