export function parsearErroresAPI(response: any): string[] {

  if (!response) {
    return ['Ha ocurrido un error inesperado'];
  }
  try {
    const resultado: string[] = [];

    if (response.code) {
      if (typeof response.code === 'string') {
        resultado.push(response.code);
      } 
    } else if (typeof response === 'string') {
      resultado.push(response);
    }

    return resultado;
  } catch (exception) {
    return ['Ha ocurrido un error inesperado'];
  }
}
