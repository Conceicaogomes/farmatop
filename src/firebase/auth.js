import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";

import app from "./firebaseConfig";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function loginGoogle() {

  try {

    const result =
      await signInWithPopup(
        auth,
        provider
      );

    return result.user;

  } catch (error) {

    console.log(error);

  }

}

export async function logoutGoogle() {

  try {

    await signOut(auth);

  } catch (error) {

    console.log(error);

  }

}

export { auth };