export function addActivity(valore) {
    return new Promise((resolve, reject) => {
        fetch("/todo/add", {
           method: 'POST',
           headers: {
              "Content-Type": "application/json"
           },
           body: JSON.stringify(valore)
        })
        .then((response) => response.json())
        .then((json) => {
           resolve(json);
        })
     })  
}
export function removeActivity(valore) {
   return new Promise((resolve, reject) => {
      fetch("/todo/"+valore, {
         method: 'DELETE',
         headers: {
            "Content-Type": "application/json"
         },
      })
      .then((response) => response.json())
      .then((json) => {
         resolve(json);
      })
   })
}
  
export function download() {
    return new Promise((resolve, reject) => {
      fetch("/todo")
      .then((response) => response.json())
      .then(data => resolve(data));
   })
}

export const hide = (element) => {
element.classList.add("hidden");
element.classList.remove("visible");
}

export const show = (element) => {
element.classList.add("visible");
element.classList.remove("hidden");
}

export const toggleDateTime = () => {
    const checkBox = document.getElementById("button-button-checkbox");
    if (checkBox.classList.contains("data-ora-checkbox-yes")){
        checkBox.classList.add("data-ora-checkbox-no");
        checkBox.classList.remove("data-ora-checkbox-yes");
        checkBox.innerHTML = "X";
        document.getElementById("input-Data").value = "";
        document.getElementById("input-Ora").value = "";
        document.getElementById("input-Data").readOnly = true;
        document.getElementById("input-Ora").readOnly = true;
    } else {
        checkBox.classList.add("data-ora-checkbox-yes");
        checkBox.classList.remove("data-ora-checkbox-no");
        checkBox.innerHTML = "✓";
        document.getElementById("input-Data").value = "";
        document.getElementById("input-Ora").value = "";
        document.getElementById("input-Data").readOnly = false;
        document.getElementById("input-Ora").readOnly = false;
    }
}