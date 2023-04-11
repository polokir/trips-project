import { doc, updateDoc, deleteDoc, getFirestore, addDoc, collection } from 'firebase/firestore';

export async function updateUser(id, newUser) {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'user', id);
    await updateDoc(userRef, newUser);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

export async function deleteteUser(id) {
  const db = getFirestore();
  const userRef = doc(db, 'user', id);
  try {
    await deleteDoc(userRef);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

export async function updateTrip(id, newTrip) {
  try {
    const db = getFirestore();
    const tripRef = doc(db, 'trip', id);
    await updateDoc(tripRef, newTrip);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

export async function deleteTrip(id) {
  const db = getFirestore();
  const tripRef = doc(db, 'trip', id);
  try {
    await deleteDoc(tripRef);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}

export async function addTrip(newTrip) {
    const db = getFirestore();
    const tripCollection = collection(db,'trip');
    await addDoc(tripCollection,newTrip);
}
