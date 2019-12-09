import { __values } from "tslib";
var DELAY_FOR_AUDIO_LOADING = 3000;
/**
 * Load asset as different as image, audio, JSON and plain text.
 */
export function fetchAssets(assets, onProgress) {
    if (onProgress === void 0) { onProgress = null; }
    return new Promise(function (resolve) {
        var e_1, _a;
        var assetNames = Object.keys(assets);
        var count = assetNames.length;
        var done = 0;
        var result = {};
        function next() {
            done++;
            if (typeof onProgress === 'function') {
                onProgress(done / count);
            }
            if (done >= count) {
                resolve(result);
            }
        }
        function onerror(key, ex) {
            console.error("Unable to load image \"" + key + "\": " + assets[key]);
            console.error(ex);
            next();
        }
        function onaudioloaded( /*audio: HTMLAudioElement, url: string*/) {
            next();
        }
        function setContent(key, content) {
            result[key] = content;
            next();
        }
        function parseText(url, response) {
            if (!response.ok) {
                throw Error('');
            }
            if (endsWith(url, 'json')) {
                return response.json();
            }
            else {
                return response.text();
            }
        }
        try {
            for (var assetNames_1 = __values(assetNames), assetNames_1_1 = assetNames_1.next(); !assetNames_1_1.done; assetNames_1_1 = assetNames_1.next()) {
                var key = assetNames_1_1.value;
                var url = assets[key];
                if (endsWith(url, 'jpg', 'png', 'gif', 'svg')) {
                    var img = new Image();
                    img.crossOrigin = 'anonymous';
                    result[key] = img;
                    img.onload = next.bind(null, url);
                    img.onerror = onerror.bind(null, key);
                    img.src = url;
                }
                else if (endsWith(url, 'ogg', 'wav', 'mp3')) {
                    var audio = document.createElement('audio');
                    result[key] = audio;
                    var slot = onaudioloaded.bind(null, audio, url);
                    audio.addEventListener('canplay', slot);
                    audio.addEventListener('loadeddata', slot);
                    window.setTimeout(slot, DELAY_FOR_AUDIO_LOADING);
                    audio.addEventListener('error', onerror.bind(null, key));
                    audio.src = url;
                }
                else {
                    fetch(url)
                        .then(parseText.bind(null, url))
                        .then(setContent.bind(null, key))
                        .catch(onerror.bind(null, key));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (assetNames_1_1 && !assetNames_1_1.done && (_a = assetNames_1.return)) _a.call(assetNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
export function endsWith(text) {
    var e_2, _a;
    var extensions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        extensions[_i - 1] = arguments[_i];
    }
    var cleanText = text.trim();
    try {
        for (var extensions_1 = __values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
            var extension = extensions_1_1.value;
            if (cleanText.substr(cleanText.length - extension.length) === extension) {
                return true;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (extensions_1_1 && !extensions_1_1.done && (_a = extensions_1.return)) _a.call(extensions_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return false;
}
//# sourceMappingURL=tools.js.map