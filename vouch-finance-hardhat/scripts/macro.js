import axios from "axios"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const BASE_URL = "https://api.spectral.finance"
const wallet_address = "0x1d35cB13B952d55Fdc9118b0e4980a675c88B2Ae"
const SPECTRAL_API_KEY =
    "SFMyNTY.g2gDbQAAACRhNmI3YjRmNy1lYjkxLTQ0ODgtYTNkMC0wZGZhZDU1NGVmYzFuBgB6blSZhgFiAAFRgA.j7gQJy50p2YsdQlaqH4bHdAUCpB9L6kM-Nw5rWBekr8"

function calculateScore() {
    axios
        .post(
            `${BASE_URL}/api/v1/addresses/${wallet_address}/calculate_score`,
            {},
            {
                headers: {
                    Host: BASE_URL,
                    Authorization: "Bearer " + SPECTRAL_API_KEY,
                },
            }
        )
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })
}

function getScore() {
    axios
        .get(`${BASE_URL}/api/v1/addresses/${wallet_address}`, {
            headers: {
                Host: BASE_URL,
                Authorization: "Bearer " + SPECTRAL_API_KEY,
            },
        })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log(error)
        })
}
calculateScore()
getScore()
