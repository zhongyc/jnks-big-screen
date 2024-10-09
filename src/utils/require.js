export const require = imgPath => {
    try {
        return new URL(`../assets/${imgPath}`, import.meta.url).href
    } catch (error) {
        console.warn(error)
    }
}
