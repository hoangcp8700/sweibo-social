const filter = (file) => {
  const size = file.size / 1000 / 1000;

  if (size > 2) {
    return {
      message: "Vì dung lượng có hạn vui lòng upload mỗi file tối đa 2mb",
      error: true,
    };
  }
  return file;
};

const uploadFile = (e) => {
  const { files } = e.target;
  if (files.length <= 1) {
    const response = filter(files[0]);
    if (response.error) return response;
    return response;
  }

  // upload multiple files
  const listFiles = [];
  for (const file of files) {
    const response = filter(file);
    if (response.error) return response;
    listFiles.push(response);
  }
  return listFiles;
};
export default uploadFile;
