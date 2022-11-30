//Llamo a los paquetes:

const fs = require("fs");
const product_path = "./productos.txt";

//Creo la clase contenedor, con la ruta correspondiente:

class Contenedor {
  constructor(path) {
    this.path = path;
  }

  //Métodos:

  getAll = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    } else {
      return [];
    }
  };

  getById = async (id) => {
    const productsCopy = await this.getAll();
    const product = productsCopy.find((product) => product.id === id);
    return product ? product : console.log("NOT FOUND");
  };

  getPorductId = async () => {
    const productsCopy = await this.getAll();
    const index = productsCopy.length;
    return index > 0 ? index + 1 : 1;
  };

  save = async (title, price, thumbnail) => {
    const id = await this.getPorductId();
    const newObj = {
      id,
      title,
      price,
      thumbnail,
    };
    const productsCopy = await this.getAll();
    productsCopy.push(newObj);
    const saveOK = await fs.promises.writeFile(
      this.path,
      JSON.stringify(productsCopy)
    );
    (saveOK) 
      return console.log(`El producto se guardo con exito con el id: ${id}`);
  };

  deleteById = async (id) => {
    const productsCopy = await this.getAll();
    const filteredProducts = productsCopy.filter((product = product.id !== id));
    await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
  };

  deleteAll = async () => {
    await fs.promises.unlink(this.path);
  };
}

//Instancia de la clase:
const pablo = new Contenedor(product_path);

pablo.getAll().then((res)=>{
    console.log(res);
});

pablo.getById(2).then((res) => {
  console.log(res);
});

// pablo.save("producto 4", 321, "sin imagen").then(()=> {
//   pablo.getAll().then((res) => {
//     console.log(res);
//   });
// })

pablo.deleteById(5);
pablo.deleteAll();