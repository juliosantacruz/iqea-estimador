export function IDFromName(nombreApellido:string) {
  // Reemplazar espacios por guiones bajos
  const nombreApellidoConGuiones = nombreApellido.replace(/ /g, '_');

  // Generar un número aleatorio de 3 dígitos
  const numeroAleatorio = Math.floor(Math.random() * 900) + 100;

  // Concatenar el número aleatorio al final
  const resultadoFinal = nombreApellidoConGuiones + numeroAleatorio;

  return resultadoFinal;
}

