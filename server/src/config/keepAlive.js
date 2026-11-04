const KEEP_ALIVE_INTERVAL_MS = 14 * 60 * 1000

const keepAlive = () => {
    const baseUrl = process.env.SELF_URL || process.env.RENDER_EXTERNAL_URL

    if (!baseUrl) {
        console.log("Keep-alive disabled: set SELF_URL or deploy on Render")
        return
    }

    const pingUrl = `${baseUrl.replace(/\/+$/, "")}/health`

    const ping = async () => {
        try {
            const res = await fetch(pingUrl)
            console.log(`Keep-alive ping ${pingUrl} -> ${res.status}`)
        } catch (error) {
            console.error(`Keep-alive ping failed: ${error.message}`)
        }
    }

    ping()
    setInterval(ping, KEEP_ALIVE_INTERVAL_MS)
}

export default keepAlive
