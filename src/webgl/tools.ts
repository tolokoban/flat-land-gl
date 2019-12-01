type IAsset = string | HTMLImageElement | HTMLAudioElement

interface IAssetsOutput {
    [key: string]: IAsset
}

const DELAY_FOR_AUDIO_LOADING = 3000

/**
 * Load asset as different as image, audio, JSON and plain text.
 */
export function fetchAssets(
    assets: { [key: string]: string },
    onProgress: ((value: number) => void) | null = null
): Promise<IAssetsOutput> {
    return new Promise((resolve) => {
        const assetNames = Object.keys(assets)
        const count = assetNames.length
        let done = 0

        const result: IAssetsOutput = {}

        function next() {
            done++
            if (typeof onProgress === 'function') {
                onProgress(done / count)
            }
            if (done >= count) {
                resolve(result)
            }
        }

        function onerror(key: string, ex: string | Event) {
            console.error(`Unable to load image "${key}": ${assets[key]}`)
            console.error(ex)
            next()
        }

        function onaudioloaded(/*audio: HTMLAudioElement, url: string*/) {
            next()
        }

        function setContent(key: string, content: IAsset) {
            result[key] = content
            next()
        }

        function parseText(url: string, response: Response) {
            if (!response.ok) {
                throw Error('')
            }
            if (endsWith(url, 'json')) {
                return response.json()
            } else {
                return response.text()
            }
        }

        for (const key of assetNames) {
            const url = assets[key]
            if (endsWith(url, 'jpg', 'png', 'gif', 'svg')) {
                const img = new Image()
                img.crossOrigin = 'anonymous'
                result[key] = img
                img.onload = next.bind(null, url)
                img.onerror = onerror.bind(null, key)
                img.src = url
            } else if (endsWith(url, 'ogg', 'wav', 'mp3')) {
                const audio = document.createElement('audio')
                result[key] = audio
                const slot = onaudioloaded.bind(null, audio, url)
                audio.addEventListener('canplay', slot)
                audio.addEventListener('loadeddata', slot)
                window.setTimeout(slot, DELAY_FOR_AUDIO_LOADING)
                audio.addEventListener('error', onerror.bind(null, key))
                audio.src = url
            } else {
                fetch(url)
                    .then(parseText.bind(null, url))
                    .then(setContent.bind(null, key))
                    .catch(onerror.bind(null, key))
            }
        }
    })
}

export function endsWith(text: string, ...extensions: string[]): boolean {
    const cleanText = text.trim()
    for (const extension of extensions) {
        if (cleanText.substr(cleanText.length - extension.length) === extension) {
            return true
        }
    }
    return false
}
