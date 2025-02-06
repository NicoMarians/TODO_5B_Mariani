import { show,hide,toggleDateTime,addActivity,removeActivity } from "./functions.js";

export  const createTable  = (newElement) => {
    let tableData;
    let bindingElement = newElement;
    return {
        render: () => {
            let line = `
            <h1>TODO LIST</h1>
            <div style="text-align: left; padding-bottom:2%;">
                <h1 class="title">Aggiungi attività</h1>
                <button class="add-button", id="button-add" ><b>+</b></button>
            </div>
            `;
            tableData.forEach((activity,index) => {
                line += `<div style="text-align: left; padding-bottom:2%;">`;
                line += `<a id="modify-${index}"><h1 class="activity-name ">${activity.name} | ${activity.date === undefined ? "" : activity.date } | ${activity.time === undefined ? "" : activity.time}</h1></a>`;
                line += `<button class="delete-button", id="delete-button-${index}"><b>X</b></button>`;
                line += `</div>`;
            });

            line += `<br>`;
            bindingElement.innerHTML = line;

            tableData.forEach((element,index) => {
                document.getElementById(`modify-${index}`).onclick = () => {
                    show(document.getElementById("form-div"));
                    const checkBox = document.getElementById("button-button-checkbox");
                    checkBox.disabled = true;
                    if (document.getElementById("input-Data").value == "" && document.getElementById("input-Ora").value == ""){
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
                    document.getElementById("input-Attività").value = element.name;
                    document.getElementById("input-Attività").readOnly = true;
                    document.getElementById("input-Data").value = element.date;
                    document.getElementById("input-Data").readOnly = true;
                    document.getElementById("input-Ora").value = element.time;
                    document.getElementById("input-Ora").readOnly = true;
                    document.getElementById("textarea-Descrizione").value = element.description;
                    document.getElementById("textarea-Descrizione").readOnly = true;
                    hide(document.getElementById("bottoneSalva"));
                }

                document.getElementById(`delete-button-${index}`).onclick = () => {
                    removeActivity(tableData[index].id).then((response) => {
                            pubSub.publish("tableRender");
                    });
                }
            });

            document.getElementById("button-add").onclick = () => {
                show(document.getElementById("form-div"));
                pubSub.publish("formRender");
            }
        },
        setTableData: (newData) => {
            tableData = newData;
        },
    }
}

export const createForm = (newElement) => {
    let formData;
    let bindingElement = newElement;
    return {
        render: () => {
            let line = '';
            line += formData.map((element) => {
                return `<${element.item} type="${element.type}" class="${element.class}" id="${element.item}-${element.name}"${element.more} `
            }).join("");
            line += `<button class="button-cancella" id="bottoneCancella">Cancella</button>`;
            line += `<button class="button-salva" id="bottoneSalva">Salva</button>`;
            bindingElement.innerHTML = line;

            document.getElementById("button-button-checkbox").onclick = () => {
                toggleDateTime();
            }

            document.getElementById("bottoneCancella").onclick = () => {
                hide(document.getElementById("form-div"));
            }

            document.getElementById("bottoneSalva").onclick = () => {
                let name = document.getElementById("input-Attività").value;
                let date = document.getElementById("input-Data").value;
                let time = document.getElementById("input-Ora").value;
                let description = document.getElementById("textarea-Descrizione").value;

                if (name != ""){
                    let newObject = {"name":name,"date":date,"time":time,"description":description};
                    addActivity(newObject).then((response) => {
                        pubSub.publish("tableRender");
                        hide(document.getElementById("form-div"));
                    })
                } else {
                    alert("ERRORE");
                }
            }
        },
        setFormData: (newData) => {
            formData = newData;
        }
    }
}

const createPubSub = () => {
    const dict = {};
    return {
        subscribe: (eventName, callback) => {
            if (!dict[eventName]) {
                dict[eventName] = [];
            }
            dict[eventName].push(callback);
        },
        publish: (eventName) => {
            dict[eventName].forEach((callback) => callback());
        }
    }
}

export const pubSub = createPubSub();
