import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "boot/firebaseConnection";
import { api } from "boot/axios";

export const checkHospitalUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    api.get('/api/users/' + user.uid).then((res) => {
      localStorage.setItem("hospital", JSON.stringify(true));
    }).catch((err) => {
      localStorage.setItem("hospital", JSON.stringify(false));
    })
  } else {
    localStorage.setItem("hospital", JSON.stringify(false));
  }
}

export const getUser = () => {
  return auth.currentUser;
};

export const update = (user, data) =>
  new Promise((resolve, reject) => {
    updateProfile(user, data);
    resolve();
  });

export const register = (data) =>
  new Promise((resolve, reject) => {
    const { email, password, ...rest } = data;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (Object.keys(rest).length > 0) {
          updateProfile(userCredential.user, rest);
        }

        resolve(userCredential.user);
      })
      .catch((err) => {
        reject(err.message);
      });
  });

export const login = (data) =>
  new Promise((resolve, reject) => {
    const { email, password, ...rest } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (Object.keys(rest).length > 0) {
          updateProfile(userCredential.user, rest);
        }

        resolve(userCredential.user);
      })
      .catch((err) => {
        reject(err.message);
      });
  });

export const logout = () =>
  new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err.message);
      });
  });
