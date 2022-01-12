
console.log("hello from js ");

fetch("/employees")
  .then(response => {
    if (!response.ok) throw new Error(response.status);
    return response.json()
  })
  .then (data => console.log(data))
  .catch(console.error);
