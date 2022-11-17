import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../utils/firebase'

const uploadImage = async (path: string, file: Blob | Uint8Array | ArrayBuffer) => {
  return await uploadBytesResumable(ref(storage, path), file, { contentType: 'image/jpeg' })
}

const getImage = async (path: string) => {
  return await getDownloadURL(ref(storage, path))
}

const uploadAndGetImage = async (path: string, file: Blob | Uint8Array | ArrayBuffer) => {
  return await uploadBytesResumable(ref(storage, path), file, { contentType: 'image/jpeg' })
  .then(async () => {
    return await getDownloadURL(ref(storage, path))
  })
}

export {
  uploadImage,
  getImage,
  uploadAndGetImage
}