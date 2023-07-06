const fs = require('fs');
const { downloadImages, addHttpsPrefix } = require('./index');

describe('Image Downloader', () => {
  const destinationDir = './test-directory';

  beforeAll(() => {
    // Cria o diretório de destino para os testes
    fs.mkdirSync(destinationDir);
  });

  afterAll(() => {
    // Remove o diretório de destino dos testes
    fs.rmdirSync(destinationDir, { recursive: true });
  });

  it('should add "https://" prefix if not already present', () => {
    const url1 = 'example.com/image.jpg';
    const url2 = 'https://example.com/image.jpg';

    expect(addHttpsPrefix(url1)).toBe('https://example.com/image.jpg');
    expect(addHttpsPrefix(url2)).toBe('https://example.com/image.jpg');
  });

  it('should download images and save them to the destination directory', (done) => {
    const urls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ];

    downloadImages(urls, destinationDir, 2, (error) => {
      expect(error).toBeNull();

      // Verifica se os arquivos foram salvos corretamente
      const files = fs.readdirSync(destinationDir);
      expect(files.length).toBe(urls.length);

      // Verifica se os nomes dos arquivos estão corretos
      expect(files.includes('image1.jpg')).toBeTruthy();
      expect(files.includes('image2.jpg')).toBeTruthy();
      expect(files.includes('image3.jpg')).toBeTruthy();

      done();
    });
  });
});
