async function getRoutine (answers) {
  console.log(answers);
  try {
    const answersBody = JSON.stringify(answers);
    console.log(answersBody);
    const response = await fetch('http://localhost:3000/routine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: answersBody,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json(); 
    return data; 
  } catch (err) {
    console.error('Error fetching routine:', err.message);
    throw err; 
  }
}

export default getRoutine;
