declare type IAsset = string | HTMLImageElement | HTMLAudioElement;
interface IAssetsOutput {
    [key: string]: IAsset;
}
/**
 * Load asset as different as image, audio, JSON and plain text.
 */
export declare function fetchAssets(assets: {
    [key: string]: string;
}, onProgress?: ((value: number) => void) | null): Promise<IAssetsOutput>;
export declare function endsWith(text: string, ...extensions: string[]): boolean;
export {};
