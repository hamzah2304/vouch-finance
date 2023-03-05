const BASE_URL = "https://api.spectral.finance"
const wallet_address = "0x1d35cB13B952d55Fdc9118b0e4980a675c88B2Ae"
// const wallet_address_vitalik = "0xab5801a7d398351b8be11c439e05c5b3259aec9b"
const SPECTRAL_API_KEY =
    "SFMyNTY.g2gDbQAAACRhNmI3YjRmNy1lYjkxLTQ0ODgtYTNkMC0wZGZhZDU1NGVmYzFuBgB6blSZhgFiAAFRgA.j7gQJy50p2YsdQlaqH4bHdAUCpB9L6kM-Nw5rWBekr8"

function calculate_score() {
    fetch(`${BASE_URL}/api/v1/addresses/${wallet_address}/calculate_score`, {
        method: "POST",
        headers: {
            Host: BASE_URL,
            Authorization: "Bearer " + SPECTRAL_API_KEY,
        },
    })
        .then((response) => response.text())
        .then((data) => {
            console.log("Success1:", data)
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

function get_score() {
    fetch(`${BASE_URL}/api/v1/addresses/${wallet_address}`, {
        method: "GET",
        headers: {
            Host: BASE_URL,
            Authorization: "Bearer " + SPECTRAL_API_KEY,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success2:", data)
        })
        .catch((error) => {
            console.error("Error:", error)
        })
}

export const Score = () => {
    calculate_score()
    get_score()
}
