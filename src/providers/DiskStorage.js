//fornece a funcionalidade para interagir com o sistema de arquivos para leitura, escrita e manipulação de arquivos
const fs = require("fs");

//resolve o caminho de arquivos
const path = require("path");

//importação da biblioteca multer para fazer o upload
const uploadConfig = require("../configs/upload");

//classe para fazer o upload e deletar arquivos
class DiskStorage{

    //função para fazer o upload
    async saveFile(file){
        //utilizamos o promises.rename dentro do fs para mudar o seu local de armazenamento, passando no primeiro parâmetro o local atual e para onde queremos enviar ele.
        await fs.promises.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOAD_FOLDER, file)
        )
        return file;
    }

    //função para deletar o arquivo antigo já que cada usuário pode ter apenas 1 foto
    async deleteFile(file){
        //pegamos o arquivo que foi adicionado na função de upload
        const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

        //tentamos acessar o arquivo com o stat para saber se o arquivo existe;
        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            return;
        }

        //se existe deletamos o arquivo com o unlink passando o filePath
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;