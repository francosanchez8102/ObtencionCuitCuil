// Ejercicio realizado por Franco Nahuel Sanchez
// Legajo 49738

const readline = require('readline');

function questionAsync(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
}


function validarNumero(numero) {
  // Verifico si es un número válido
  if (isNaN(numero)) {
    console.log("El valor ingresado no es un número válido.");
    return false;
  }
  // Verifico si es un entero
  if (!Number.isInteger(numero)) {
    console.log("El número debe ser un entero.");
    return false;
  }
  // Verifico si es positivo y mayor que cero
  if (numero <= 0) {
    console.log("El número debe ser positivo y mayor que cero.");
    return false;
  }
  // Verifico la longitud
  if (numero.toString().length !== 8) {
    console.log("El número de documento debe tener 8 dígitos.");
    return false;
  }

  // Si pasa todas las validaciones, es un número válido
  return true;
}

//Valido si se trata de un genero valido
function validarGenero(genero) {
  // Convierto el género a minúsculas y elimino espacios en blanco
  genero = genero.toLowerCase().trim();
  // Verifico si el género es válido
  if (genero === "h") {
    return 20;
  }
  if (genero === "m") {
    return 27
  }

  // Si no es válido, muestro un mensaje de error
  return false;
}

//Funcion para pedir el genero del usuario, si o si se tiene que ingresar uno valido
async function pedirGenero() {
  let genero;
  while (true) {
    genero = await questionAsync("Ingresa tu género (H: hombre/ M: mujer): ");
    const tipo = validarGenero(genero);
    if (tipo) {
      return tipo;
    } else {
      console.log("El género ingresado no es válido. Por favor, ingresa 'H' para hombre o 'M' para mujer.");
    }
  }
}


//Funcion para pedir el documento, si o si se tiene que ingresar uno valido
async function pedirDocumento() {
  let documento;
  while (true) {
    const input = await questionAsync("Ingresa tu número de documento: ");
    documento = parseInt(input);
    if (validarNumero(documento)) {
      return documento;
    } else {
      console.log("Por favor, ingresa un número de documento válido.");
    }
  }
}

//Funcion para obtener cuit
async function obtenerCuit(cuit) {
  let digito = 0;
  let z = 0;
  for (var i = 0, o = 5; i < 4; i++, o--) {
    digito = digito + cuit[i] * o;
  };

  for (var i = 4, o = 7; i < 10; i++, o--) {
    digito = digito + cuit[i] * o;
  };

  z = Math.round(digito / 11);
  z = digito - (11 * z)
  if (z <= 9 && z > 0) {
    return (11 - z)
  }
  else {
    return Math.abs(z)
  }
}

async function ejecutarPrograma() {
  //Obtengo el genero de la persona
  let tipo = await pedirGenero();
  //Obtengo su documento
  let documento = await pedirDocumento();

  //Obtengo el cuit
  let cuit = tipo.toString() + documento.toString();
  cuit = cuit.split("").map(Number);
  cuit = await obtenerCuit(cuit);

  //Muestro en pantalla cual es el cuit de la persona
  let nroFinal = tipo.toString() + "-" + documento.toString() + "-" + cuit.toString();
  console.log("Tu cuil/cuit es: ", nroFinal);
}


//Ejecucion del programa
ejecutarPrograma();