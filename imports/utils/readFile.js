import fs, {createReadStream, existsSync} from 'fs-extra';
import { FILE_LOCATION } from '/imports/utils/constans';

WebApp.connectHandlers.use('/images', (req, res, next) => {
  const storagePath = FILE_LOCATION;
  const storageFolder = req.originalUrl.split('/')[2];
  const filename = req.originalUrl.split('/')[3];

  const fullFilePath = `${storagePath}/${storageFolder}/${filename}`;

  if(!existsSync(fullFilePath)) {
    // res.writeHead(400);
    // res.end();
    // return;

    const noFilePath = `${storagePath}/noImage.jpg`;
    const noFile = createReadStream(noFilePath);

    res.writeHead(200);

    noFile
      .on('data', (chunk) => {
        console.log(`chunk size: ${chunk.length}`);
      })
      .pipe(res)
      .on('finish', () => {
        console.log('read file finish');
      })
    return;
  }

  const file = createReadStream(fullFilePath);

  res.writeHead(200);

  file
    .on('data', (chunk) => {
      console.log(`chunk size : ${chunk.length}`);
    })
    .pipe(res)
    .on('end', () => {
      console.log('read file finish');
    })
});