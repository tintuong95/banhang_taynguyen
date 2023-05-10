import fetchAxios from "../configs/axios.js";

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        loader.file.then(async (file) => {
          data.append("photo", file);
          const response = await fetchAxios({
            method: "post",
            data,
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "multipart/form-data",
            },
            url: "/product/upload-image",
          });
          resolve({
            default: `${process.env.REACT_APP_HOST}/img/product/${response.url}`,
          });
        });
      });
    },
  };
}

export default function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}


