export function parsearErroresAPI(response: any): string[] {

  if (!response) {
    return ['Ha ocurrido un error inesperado'];
  }
  try {
    const resultado: string[] = [];

    if (response.error) {
      if (typeof response.error === 'string') {
        resultado.push(response.error);
      } else if (typeof response.error.error.message === 'string' ){
        resultado.push(response.error.error.message)
      }
    } else if (typeof response === 'string') {
      resultado.push(response);
    }

    return resultado;
  } catch (exception) {
    return ['Ha ocurrido un error inesperado'];
  }
}
