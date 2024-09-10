export const getQuestions = async () => {
  try {
    const response = await fetch('http://localhost:3000/questions');
    if (!response.ok) {
      throw new Error('La respuesta del servidor no fue favorable');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Error al cargar las preguntas iniciales: ' + err.message);
  }
};
