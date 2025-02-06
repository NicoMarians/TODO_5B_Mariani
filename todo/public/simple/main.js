import { download} from "./functions.js";
import { createForm,createTable, pubSub } from "./components.js";


download().then((newData) => {
    const table = createTable(document.getElementById("listDiv"));
    table.setTableData(newData);

    const form = createForm(document.getElementById("formInput"));
    fetch("./conf.json").then(r => r.json()).then((confData) => {
        form.setFormData(confData.formConfig);

        pubSub.subscribe("tableRender",() => {
            download().then((newData) => {
                table.setTableData(newData);
                table.render();
            });
        });
        pubSub.subscribe("formRender",form.render);

        table.render();
        form.render();

        setInterval(() => {
            download().then((newData) => {
               table.setTableData(newData);
               table.render();
            });
         }, 30000);

    });
});




