const buttonAnimal = document.getElementById('buttonAnimal');

console.log(buttonAnimal)

buttonAnimal.addEventListener('click', () => {
    const animalName = document.getElementById('animal').value;
    const encodedAnimalName = encodeURIComponent(animalName);
    const url = `/get_lineage?animalName=${encodedAnimalName}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const lineageValue = data.lineage;
      // Use the lineageValue to update your frontend
      const eachTaxa = lineageValue.split("; ");
      const h1s = document.getElementsByTagName("h1")
      for(i = 0; i < h1s.length ; i++) {

        h1s[i].innerText = eachTaxa[i];
      
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});