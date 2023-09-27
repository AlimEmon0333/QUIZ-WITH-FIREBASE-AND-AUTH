import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
// import { app } from "./firebaseconfig";
import { app } from "./firebaseConfig";

const auth = getAuth(app);
const db = getDatabase(app)

export let Login = (body: any) => {
    return new Promise<any>((resolve, reject) => {
        if (!body.Email || !body.Password) {
            reject("please enter Email or Password")
        } else {
            signInWithEmailAndPassword(auth, body.Email, body.Password)
                .then(res => {
                    let id = res.user.uid
                    body.id = id
                    resolve(res)
                    const referece = ref(db, `users/${id}`)

                    onValue(referece, (data) => {
                        if (data.exists()) {
                            resolve('user created succesfully')
                        } else {
                            reject("No Data Found")
                        }
                    })

                }).catch(err => {
                    reject('ahad')
                })
        }
    })
}

export let SignUp = (body: any) => {
    return new Promise<any>((resolve, reject) => {
        if (!body.Email || !body.Password) {
            reject("please enter Email or Password")
        } else {
            createUserWithEmailAndPassword(auth, body.Email, body.Password)
                .then(res => {
                    let id = res.user.uid
                    body.id = id
                    const referece = ref(db, `users/${id}`)
                    set(referece, body)
                        .then(user => {
                            resolve('You are signup successed  ')
                        })
                        .catch(errs => {
                            reject('errs')
                        })
                        .catch(err => {
                            reject('err')
                        })
                })
        }
    })
}
export let Add = (nodeNames: any, body: any, id?: any) => {
    return new Promise<any>((resolve, reject) => {
        const TaskID = push(ref(db, `${nodeNames}/`)).key
        body.id = TaskID
        const reference = ref(db, `${nodeNames}/${body.id}`)
        set(reference, body).then(res => {
            resolve('add successfully')
        }).catch(err => {
            reject(err)
        })
    })
}
export let Get = (nodeName: any) => {
    return new Promise<any>((resolve, reject) => {
        const reference = ref(db, `${nodeName}`)
        onValue(reference, (data) => {
            if (data.exists()) {
                resolve(Object.values(data.val()))
                console.log(Object.values(data.val()))
            } else {
                reject("No Data Found")
            }
        })
    })
}