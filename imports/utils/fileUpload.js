import fs, { createWriteStream } from 'fs-extra';
import shortid from 'shortid';
import { FILE_LOCATION } from '/imports/utils/constans';

const getFilePath = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const uploadFolderName = `/${String(year)}${String(month)}${String(day)}/`;
  const uploadFolder = FILE_LOCATION + uploadFolderName;

  try {
    fs.statSync(uploadFolder);
  }
  catch(error) {
    if(error.code === 'ENOENT') {
      fs.mkdirSync(uploadFolder, error => {
        if(error) throw error;
      });
    }
  }

  const pathInfo = {
    makeFolder: uploadFolderName,
    uploadFolder: uploadFolder,
  }

  return pathInfo;
}

const processUpload = async (upload) => {

  const { createReadStream, filename, mimetype, encoding } = await upload;
  const stream = createReadStream();

  const ext = filename.substring(filename.indexOf('.')+1);
  const id = shortid.generate();
  const pathInfo = await getFilePath();
  const path = pathInfo.uploadFolder;
  const newFile = `${path}${id}.${ext}`;
  const newFileName = `${id}.${ext}`;

  const fileName = newFileName;
  const filePath = pathInfo.makeFolder;
  const fileType = mimetype;

  let filesize = 0;
  const maxFileSize = 10000000;

  const checkExt = new RegExp('(bmp|gif|jpg|jpeg|png)', 'i');
  if(!checkExt.test(ext)) throw '업로드 할 수 없는 파일 형식입니다. ';

  return new Promise((resolve, reject) => {
    stream
      .on('data', function(chunk) {
        // console.log(`chunk: ${chunk.length}`);
        filesize += chunk.length;
        if(filesize > maxFileSize) {
          stream.destroy();
          fs.remove(newFile);
          reject('over file size');
        }
      })
      .pipe(createWriteStream(newFile))
      .on('finish', () => {
        console.log('finish');
        return resolve({fileName, filePath, fileType});
      })
      .on('error', reject)
  });
}

export default processUpload;