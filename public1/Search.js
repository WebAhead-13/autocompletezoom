
var data ;
input= document.querySelector("#myInput");

fetch("/employees")
  .then(response => {
    if (!response.ok) throw new Error(response.status);
    return response.json()
  })
  .then (json => {
     data=json;
     console.log(json)
    })
  .catch(console.error);

  input.addEventListener("input", function(e) {
    console.log(e.target.value)
    const text=e.target.value;
    if(e.target.value) {
    for(let i=0;i<data.Employees.length;i++)
    {
      let name=data.Employees[i].firstName;
      if(name.startsWith(text))
        console.log(name)

    }
  }


  })




