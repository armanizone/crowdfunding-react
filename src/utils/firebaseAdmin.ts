import * as firebaseAdmin from 'firebase-admin'

try {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: process.env.REACT_APP_ADMIN_PROJECT_ID,
        clientEmail: process.env.REACT_APP_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.REACT_APP_ADMIN_PRIVATE_KEY,
      }),
      databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`
    })
  }
  console.log('Initialized.')
} catch (error) {

  let errorMessage = 'failed'
  if (error instanceof Error) {
    errorMessage = error.message
  }
  if (!/already exists/u.test(errorMessage)) {
    console.error('Firebase admin initialization error')
  }
}

export { firebaseAdmin }