
// image to base64

export default function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const preview = document.querySelector("img");
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            preview.src = fileReader.result;
            resolve(fileReader.result);
        }
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
}