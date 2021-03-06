const filter = (file) => {
  const size = file.size / 1000 / 1000;
  if (size > 7) {
    return {
      message: "Vì dung lượng có hạn vui lòng upload mỗi file tối đa 7mb",
      error: true,
    };
  }
  return file;
};

const blobToData = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
};

const uploadFile = async (e, folder) => {
  const { files } = e.target;

  if (!files?.length) return;

  // upload multiple files
  const listFiles = [];
  for await (const file of files) {
    // check size ...
    const response = filter(file);
    if (response?.error) return response;

    const resData = await blobToData(file);

    listFiles.push({
      file,
      url: resData,
      public_id: `${folder ? `${folder}/` : ""}${Math.floor(
        Math.random() * 912736128
      )}`,
    });
  }
  return listFiles;
};

export default uploadFile;
