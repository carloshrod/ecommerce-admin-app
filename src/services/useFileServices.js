import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';
import withEnhances from './withEnhances';
import { useGlobalContext } from '@contexts/global/GlobalContext';

const storage = getStorage();

const useFileServices = () => {
	const { setProgressValue } = useGlobalContext();

	const uploadAndGetURL = (file, filePath, index = null) => {
		return new Promise((resolve, reject) => {
			const reference = ref(storage, filePath);
			const uploadTask = uploadBytesResumable(reference, file);

			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setProgressValue({ value: progress, index });
				},
				error => {
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
						setProgressValue({ progress: null, index: null });
						resolve(downloadURL);
					});
				},
			);
		});
	};

	const generateImageURL = withEnhances(async (file, id) => {
		const filePath = `avatars/avt-${id}`;
		return uploadAndGetURL(file, filePath);
	});

	const generateImagesArray = withEnhances(async (files, id) => {
		const array = [];

		for (let i = 0; i < files.length; i++) {
			const filePath = `product_images/pim-${id}/pim-${id}-${i + 1}`;
			const url = await uploadAndGetURL(files[i], filePath, i + 1);
			array.push(url);
		}

		return array;
	});

	const deleteFile = withEnhances(async id => {
		const filePath = `avatars/avt-${id}`;
		const reference = ref(storage, filePath);
		await deleteObject(reference);
		return 'File deleted successfully!';
	});

	const deleteFiles = withEnhances(async id => {
		for (let i = 0; i < 5; i++) {
			const filePath = `product_images/pim-${id}/pim-${id}-${i + 1}`;
			const reference = ref(storage, filePath);
			await deleteObject(reference);
		}
		return 'Files deleted successfully!';
	});

	return { generateImageURL, generateImagesArray, deleteFile, deleteFiles };
};

export default useFileServices;
