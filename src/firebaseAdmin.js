import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import serviceAccount from '../firebase-keys.json';

const options = {
	credential: cert(serviceAccount),
};

function createFirebaseAdminApp(config) {
	if (getApps().length === 0) {
		return initializeApp(config);
	} else {
		return getApp();
	}
}

const firebaseAdmin = createFirebaseAdminApp(options);
export const adminAuth = getAuth(firebaseAdmin);
