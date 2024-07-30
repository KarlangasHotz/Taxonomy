const buttonAnimal = document.getElementById('buttonAnimal');


document.addEventListener('DOMContentLoaded', () => {
  let levels = ["Domain", "Kingdom", "Phylum", "Class", "Order", "Family", "Genus", "Species"];
  let h1Elements = document.querySelectorAll('h1');

  levels.forEach((level, index) => {
      if (h1Elements[index]) {
          h1Elements[index].id = level.toLowerCase();
          h1Elements[index].textContent = level;
      }
  });

  document.getElementById('buttonAnimal').addEventListener('click', () => {
      let animalName = document.getElementById('animal').value;
      fetch(`/get_lineage?animalName=${encodeURIComponent(animalName)}`)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  alert(data.error);
              } else {
                  levels.forEach(level => {
                      let element = document.getElementById(level.toLowerCase());
                      if (element) {
                          element.textContent = data[level.toLowerCase()] || `No data for ${level}`;
                      }
                  });
              }
          })
          .catch(error => console.error('Error:', error));
  });
});