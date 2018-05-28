window.onload=function () {
    var selectOne = document.getElementById("select-1");
    var button = document.getElementById("button");
    var commits = document.getElementsByClassName("commit");
    var innerForm1 = document.getElementById("inner-form-1");
    var innerForm2 = document.getElementById("inner-form-2");
    var selectTwo = document.getElementById("select-2");
    var table = document.getElementById("table");
    var tableNumber=1;
    var line=0;
    var allTable=[];
    var tables=[];
    var lines=[];
    var isOdd=false;
    var tableName="";
    selectOne.onchange=function () {
        if(selectOne.options[1].selected) {
            innerForm2.innerHTML="";
            table.innerHTML="";
            for(let j=0;j<commits.length;j++){
                commits[j].className="commit hidden";
            }
            var content = '';
            content += '<input type="text" placeholder="Table Name" id="tableTitle">';
            content += '<input type="number" placeholder="Columns Numbers" id="col"><br>';
            innerForm1.innerHTML=content;
            var col = document.getElementById("col");
            col.onchange=function () {
                innerForm2.innerHTML="";
                if(col.value>=1){
                    let subContent = "";
                    for(let i=0;i<col.value;i++){
                        subContent += '<input type="text" class="tableContent" placeholder="Attribute">';
                    }
                    innerForm2.innerHTML+=subContent;
                    for(let j=0;j<commits.length;j++){
                        commits[j].className="commit hidden";
                    }
                    commits[0].className="commit show";
                    line = parseInt(col.value);
                }
            };
            var ths = innerForm2.getElementsByClassName("tableContent");
            var tableTitle = document.getElementById("tableTitle");
            let commit1 = commits[0];
            commit1.onclick=function () {
                tables.splice(0,tables.length);
                lines.splice(0,lines.length);
                var tableContent="";
                for(let index=1;index<=ths.length;index++){
                    if(ths[index-1].value===""){
                        tableContent += "<th>"+"Attr"+index+"</th>";
                        lines[index-1]="Attr"+index;
                    }else {
                        tableContent += "<th>"+ths[index-1].value+"</th>";
                        lines[index-1]=ths[index-1].value;
                    }
                }
                tables[0]=lines;
                table.innerHTML="<tr>"+tableContent+"</tr>";

                if(tableTitle.value===""){
                    selectTwo.innerHTML += "<option selected>"+"Table"+tableNumber+"</option>";
                    tableName="Table"+tableNumber;
                    allTable[tableName]=tables;
                    tableNumber++;
                }else {
                    tableName="";
                    selectTwo.innerHTML += "<option selected>"+tableTitle.value+"</option>";
                    tableName=tableTitle.value;
                    allTable[tableName]=tables;
                }
            };
        }else if(selectOne.options[2].selected){
            innerForm1.innerHTML="";
            innerForm2.innerHTML="";
            let subContent = "";
            for(let i=0;i<line;i++){
                subContent += '<input type="text" class="tdContent" placeholder="Attribute">';
            }
            innerForm2.innerHTML+=subContent;
            for(let i=0;i<commits.length;i++){
                commits[i].className="commit hidden";
            }
            commits[1].className="commit show";
            let commit2 = commits[1];
            commit2.onclick=function () {
                let tds = innerForm2.getElementsByClassName("tdContent");
                let tdContent = "";
                let newArr=[];
                for(let j=0;j<tds.length;j++){
                    tdContent += "<td>"+tds[j].value+"</td>";
                    newArr[j]=tds[j].value;
                }
                if(isOdd){
                    table.innerHTML+="<tr>"+tdContent+"</tr>";
                    isOdd=!isOdd;
                }else{
                    table.innerHTML+='<tr class="odd">'+tdContent+"</tr>";
                    isOdd=!isOdd;
                }
                tables[tables.length]=newArr;
                allTable[tableName]=tables;
            }
        }else if(selectOne.options[3].selected){
            innerForm1.innerHTML="";
            innerForm2.innerHTML="";
            let subContent = "";
            for(let i=0;i<line;i++){
                subContent += '<input type="text" class="delete" placeholder="Attribute">';
            }
            innerForm2.innerHTML+=subContent;
            for(let i=0;i<commits.length;i++){
                commits[i].className="commit hidden";
            }
            commits[2].className="commit show";
            let commit3 = commits[2];
            commit3.onclick=function () {
                tables=allTable[tableName];
                let deletes = innerForm2.getElementsByClassName("delete");
                let isDelete = false;
                let index=-1;
                for(let i=1;i<tables.length;i++){
                    let newArr=tables[i];
                for(let j=0;j<newArr.length;j++){
                    if(deletes[j].value===""||newArr[j]===deletes[j].value){
                        isDelete=true;
                    }else{
                        isDelete=false;
                        break;
                    }
                }
                if(isDelete){
                    index=i;
                    break;
                }
                }
                if(index!==-1){
                for(let m=index;m<tables.length-1;m++){
                    let midArr=tables[m+1];
                    let newArr=[];
                    for(let x=0;x<midArr.length;x++){
                        newArr[x]=midArr[x];
                    }
                    tables[m]=newArr;
                }
                tables.pop();
                }
                let tableContent="";
                let th="";
                for(let x=0;x<tables[0].length;x++){
                    th+="<th>"+tables[0][x]+"</th>";
                }
                tableContent += "<tr>"+th+"</tr>";
                for(let x=1;x<tables.length;x++){
                    let td="";
                    for(let y=0;y<tables[x].length;y++){
                        td+="<td>"+tables[x][y]+"</td>";
                    }
                    tableContent+="<tr>"+td+"</tr>";
                }
                table.innerHTML=tableContent;
                allTable[tableName]=tables;
            }
        }else if(selectOne.options[4].selected){
            innerForm1.innerHTML="";
            innerForm2.innerHTML="";
            innerForm2.innerHTML="WARNING: You cannot undo this action!";
            for(let i=0;i<commits.length;i++){
                commits[i].className="commit hidden";
            }
            commits[3].className="commit show";
            let commit4 = commits[3];
            commit4.onclick=function () {
                let options = selectTwo.options;
                let index=-1;
                let arr=[];
                for(let i=0;i<options.length;i++){
                    arr[i]=options[i].value;
                    if(options[i].selected){
                        index=i;
                    }
                }
                let subOptions="";
                for(let i=0;i<options.length;i++){
                    if(i!==index&&i!==index+1){
                        subOptions += "<option>"+arr[i]+"</option>";
                    }else if(i===index+1){
                        subOptions += "<optipn seleted>"+arr[i]+"</optipn>";
                    }
                }
                selectTwo.innerHTML=subOptions;
                tableName=selectTwo.value;
                tables=allTable[tableName];
                table.innerHTML="";
                let tableContent="";
                let th="";
                for(let x=0;x<tables[0].length;x++){
                    th+="<th>"+tables[0][x]+"</th>";
                }
                tableContent += "<tr>"+th+"</tr>";
                for(let x=1;x<tables.length;x++){
                    let td="";
                    for(let y=0;y<tables[x].length;y++){
                        td+="<td>"+tables[x][y]+"</td>";
                    }
                    tableContent+="<tr>"+td+"</tr>";
                }
                table.innerHTML=tableContent;
            }
        }else{
            innerForm1.innerHTML="";
        }
    };
    selectTwo.onchange=function () {
        tableName=selectTwo.value;
        tables=allTable[tableName];
        let odd=false;
        table.innerHTML="";
        let tableContent="";
        let th="";
        for(let x=0;x<tables[0].length;x++){
            th+="<th>"+tables[0][x]+"</th>";
        }
        tableContent += "<tr>"+th+"</tr>";
        for(let x=1;x<tables.length;x++){
            let td="";
            for(let y=0;y<tables[x].length;y++){
                td+="<td>"+tables[x][y]+"</td>";
            }
            if(odd){
                odd=!odd;
                tableContent+='<tr class="odd">'+td+'</tr>';
            }else{
                tableContent+="<tr>"+td+"</tr>";
            }
        }
        table.innerHTML=tableContent;
    }
};