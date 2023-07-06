const fs = require('fs');
const https = require('https');
const path = require('path');
const async = require('async');

function downloadImage(url, destination, callback) {
  const filename = path.basename(url);
  const filePath = path.join(destination, filename);
  const file = fs.createWriteStream(filePath);

  https.get(url, (response) => {
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Imagem salva: ${filePath}`);
      callback(null, filename);
    });

    file.on('error', (error) => {
      fs.unlinkSync(file.path);
      callback(error);
    });
  }).on('error', (error) => {
    callback(error);
  });
}

function downloadImages(urls, destination, concurrentDownloads = 5, callback) {
  fs.mkdirSync(destination, { recursive: true });

  async.eachLimit(
    urls,
    concurrentDownloads,
    (url, cb) => {
      const httpsUrl = addHttpsPrefix(url);
      downloadImage(httpsUrl, destination, cb);
    },
    (error) => {
      if (error) {
        console.error('Ocorreu um erro durante o download:', error);
        callback(error);
      } else {
        console.log('Download completo!');
        callback(null);
      }
    }
  );
}

function addHttpsPrefix(url) {
  if (!url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

// Diretório de destino
const destinationDir = './imagens';

// Lê o arquivo "urls.txt" para obter a lista de URLs
fs.readFile('urls.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Erro ao ler o arquivo:', error);
    return;
  }

  // Extrai as URLs a partir do conteúdo do arquivo
  const imageUrls = data.trim().split('\n');

  // Quantidade de downloads simultâneos (opcional)
  const concurrentDownloads = process.argv[2] || 5;

  downloadImages(imageUrls, destinationDir, concurrentDownloads, (error) => {
    if (error) {
      console.error('Ocorreu um erro:', error);
    } else {
      console.log('Todos os downloads foram concluídos.');
    }
  });
});

module.exports = {
  addHttpsPrefix,
  downloadImages
};