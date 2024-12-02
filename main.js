import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
apiKey: "AIzaSyDmI0zRauvzaL4oEuXinkmXhGiwTsYxYQc",
  authDomain: "insan-cemerlang-ee7af.firebaseapp.com",
  projectId: "insan-cemerlang-ee7af",
  storageBucket: "insan-cemerlang-ee7af.appspot.com",
  messagingSenderId: "1047091827759",
  appId: "1:1047091827759:web:0f1742d6f3922f856de2da",
  measurementId: "G-GL8J5GC8XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const basisdata = getFirestore(app);

export async function tambahPelanggan(nama, alamat, notelepon) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "PELANGGAN2"), {
      nama: nama,
      alamat: alamat,
      notelepon: notelepon
    })

    // menampilkan pesan berhasil
    console.log('berhasil menyimpan data pelanggan')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data pelanggan' + error)
  }
}


export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "PELANGGAN2");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data().alamat,
      notelepon: dokumen.data().notelepon

    })
  })

  return hasilKueri;
}

export async function ubahPelanggan(id, namabaru, alamatbaru, noteleponbaru) {
  await updateDoc(
    doc(basisdata, "PELANGGAN2", id), { nama: namabaru, alamat: alamatbaru, notelepon: noteleponbaru }
  )
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "PELANGGAN2", id))
}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "PELANGGAN2", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}