import multer from "multer"; // Multer is a Node.js middleware used for handling multipart/form-data, primarily for uploading files.
const multer  = require('multer')
// USES A DEFAULT TEMP directory (OS-level) to stores files, so its better to mention a folder as destination
// const storage = multer.diskStorage({
// filename: function (req, file, callback) {
// callback(null, file.originalname)
// }
// });
const storage = multer.diskStorage()

const upload = multer({ storage: storage })

export default upload // Extracts files and attaches them to req.file, req.body. Multer parses it and attaches values to req.body as plain JavaScript objects.