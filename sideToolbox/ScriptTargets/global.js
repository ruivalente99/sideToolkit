const someCheckbox = document.getElementById('darkModeCheckBox');

someCheckbox.addEventListener('change', e => {
  if(e.target.checked === true) {
    document.body.style.backgroundColor = "red";
  }
if(e.target.checked === false) {
    document.body.style.backgroundColor = "blue";
  }
});

    


  
