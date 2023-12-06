import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
} from 'firebase/storage';
import withEnhances from './withEnhances';

const storage = getStorage();

export const generateImageObj = withEnhances(async (file, userId) => {
	const filePath = `avatars/avt-${userId}`;
	const reference = ref(storage, filePath);
	const snapshot = await uploadBytes(reference, file);

	return {
		fileName: snapshot.metadata.name,
		url: await getDownloadURL(reference),
	};
});

export const deleteFile = withEnhances(async userId => {
	const filePath = `avatars/avt-${userId}`;
	const reference = ref(storage, filePath);
	await deleteObject(reference);
	return 'File deleted successfully!';
});
