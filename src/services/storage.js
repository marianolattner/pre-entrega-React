import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export async function uploadProductImage(file) {
  const fileName = `productos/${Date.now()}-${file.name}`
  const storageRef = ref(storage, fileName)

  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)

  return downloadURL
}