// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8lOrLwD2_FPL6u8sMZYyfIPHLJ7vsDv0",
    authDomain: "gossipweb-37abf.firebaseapp.com",
    projectId: "gossipweb-37abf",
    storageBucket: "gossipweb-37abf.appspot.com",
    messagingSenderId: "118148093161",
    appId: "1:118148093161:web:d11d2bd2a0c49c7ffdcc78",
    measurementId: "G-2H2JT8KV38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const uploadFile = async (asset, onProgress, idOwner) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `uploads/${asset.type}/${asset.name}`);
        const uploadTask = uploadBytesResumable(storageRef, asset.file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(progress);
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(storageRef).then(async (url) => {
                    return await axios.patch(`${process.env.REACT_APP_API, asset.type}/${idOwner}`, { imagen: url }).then(() => {
                        resolve();
                    });

                });
            }
        );
    });
};
const deleteFile = async (asset) => {
    const storageRef = ref(storage, `uploads/${asset.type}/${asset.name}`);
    return await deleteObject(storageRef)
};

export { deleteFile, uploadFile };