# Download Pics

This Node.js script allows you to download a list of images from URLs provided in a `urls.txt` file. The images are saved to a specified directory.

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)


## Installation
1. Clone or download this repository to your local machine.

2. Navigate to the project directory using a terminal or command prompt.

3. Run the following command to install the dependencies:

```shell
npm install
```

## Usage

1. Place the URLs of the images you want to download in a file named urls.txt. Each URL should be on a separate line.

2. Open the urls.txt file and add the URLs to it.

3. In the terminal or command prompt, navigate to the project directory.

4. Run the following command to start the image download process:

```shell
node index.js [concurrentDownloads]
```

> [concurrentDownloads] (optional): The number of simultaneous downloads to perform. Default value is 5. You can specify a different value if desired.

Example:

```shell
node index.js 3
```

5. The script will create a directory named imagens (if it doesn't already exist) and save the downloaded images to that directory. The images will be named based on their original filenames.

6. Monitor the terminal or command prompt for progress updates. Each downloaded image will be logged with its respective file path.

7. Once all the images have been downloaded, the script will display a "Download complete!" message.

## Running Tests

To run the unit tests, use the following command:

```shell
npm test
``` 

## License

This project is licensed under the MIT License.