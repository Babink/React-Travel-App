import axios from "axios";


const url = "http://localhost:4000/auth"

const headers = {
    "Content-Type": 'application/json'
}

export const registerUser = ({ username, email, password }) => {
    return async function (dispatch) {
        await axios.post(`${url}`, {
            "username": username,
            "email": email,
            "password": password
        }, {
            headers: headers
        })
            .then((docs) => {
                const token = {
                    "access_token": docs.data.access_token,
                    "refresh_token": docs.data.refresh_token
                }

                console.log("SUCCESSFUL")

                localStorage.setItem('token', JSON.stringify(token))
            })
            .catch((e) => {
                console.log("Error while creating user account")
            })
    }
}

export const loginUser = ({ username, email, password }) => {
    return async function (dispatch) {
        await axios.patch(`${url}`, {
            "username": username,
            "email": email,
            "password": password
        }, {
            headers: headers
        })
            .then((docs) => {
                const token = {
                    "access_token": docs.data.access_token,
                    "refresh_token": docs.data.refresh_token
                }

                localStorage.setItem('token', JSON.stringify(token))
            })
            .catch((e) => {
                console.log("Error while login user")
            })
    }
}

export const removeAccessToken = () => {
    console.log("REMOVING ACCESS TOKEN")
    console.log(localStorage.getItem('token'))
    return async function () {
        const access_token = JSON.parse(localStorage.getItem('token')).access_token
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
        await axios.get(`${url}/logout`, {
            headers: headers
        })
            .then((docs) => {
                console.log(docs.data)
                console.log("Successfully removed access token")
            })
            .catch((e) => {
                console.log(`Error access token :${e}`)
            })
    }
}

export const removeRefreshToken = () => {
    return async function () {
        const refresh_token = JSON.parse(localStorage.getItem('token')).refresh_token
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refresh_token}`
        }
        await axios.delete(`${url}/logout`, {
            headers: headers
        })
            .then((docs) => {
                console.log(docs.data)
                console.log("Successfully removed refresh token")
            })
            .catch((e) => {
                console.log(`Error refresh token :${e}`)
            })
    }
}


export const getAccessTokenFromRefreshToken = () => {
    return async function () {
        const refresh_token = JSON.parse(localStorage.getItem('token')).refresh_token
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refresh_token}`
        }

        await axios.patch(`${url}/logout`, {
            headers: headers
        })
            .then((docs) => {
                console.log(docs.data)
                console.log("Successfully accessed Access token")
            })
            .catch((e) => {
                console.log("Error while accessing access")
            })
    }
}


export const getUserIdByName = () => {
    return async function () {
        const username = await getUserName()

        await axios.post('http://localhost:4000/get/user', {
            "username": username.data.username
        }, {
            headers: headers
        })
            .then((docs) => {
                localStorage.setItem('user', JSON.stringify(docs.data.data))
            })
            .catch((e) => {
                console.log(e)
            })
    }
}

async function getUserName() {
    const access_token = JSON.parse(localStorage.getItem('token')).access_token
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${access_token}`
    }

    return await axios.get('http://localhost:4000/get/user', {
        headers: headers
    })
}
