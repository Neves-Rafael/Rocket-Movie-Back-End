//para resolver o caminho de arquivos
const path = require("path");

//importação da biblioteca multer para fazer o upload
const multer = require("multer");

//importação do crypto que já está disponível dentro do node
const crypto = require("crypto");

//caminho da pasta temp
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
//caminho da pasta de upload
const UPLOAD_FOLDER = path.resolve(__dirname, "uploads");

const MULTER = {
  //propriedade do multer de storage
  storage: multer.diskStorage({
    //destino onde será salvo o arquivo
    destination: TMP_FOLDER,

    //função para dar nome ao arquivo
    filename: (request, file, callback) => {
      //criando o hash de forma aleatória para dar nome ao arquivo
      const fileHash = crypto.randomBytes(10).toString("hex");
      //criando o nome do arquivo com o hash e o nome original
      const fileName = `${fileHash}-${file.originalname}`;

      //retornando a callback com o filename
      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOAD_FOLDER,
  MULTER,
};
