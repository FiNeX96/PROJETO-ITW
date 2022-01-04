
var count = 0;



function clearForm() {
    for (i = 1; i <= 12; i++) {
        x = document.getElementById("question" + i + "_T").checked;
        y = document.getElementById("question" + i + "_F").checked;
        z = document.getElementById("question" + i + "_X").checked;
        x = false;
        y = false;
        z = false;
    }
}



function clearAnswers() {
    for (i = 1; i <= 12; i++) {
        x = document.getElementById("question" + i + "_T").checked;
        y = document.getElementById("question" + i + "_F").checked;
        z = document.getElementById("question" + i + "_X").checked;
        x = false;
        y = false;
        z = false;
    }
}

    function clearAnswer(q) {
        console.log ("1")
        var x = document.getElementById("question" + q + "_T").checked;
        var y = document.getElementById("question" + q + "_F").checked;
        var z = document.getElementById("question" + q + "_X").checked;
        x = false;
        y = false;
        z = false;
   
    }

function checkStatus() {
    retVal = true;
    nmecError = document.getElementById("nmecError");
    nameError = document.getElementById("nameError");
    emailError = document.getElementById("emailError");
    degreeError = documents.getElementsById("degree")
    console.log("1");
    for (i = 1; i <= 12; i++) {
        var x = document.getElementById("question" + i + "_T").checked = true;
        var y = document.getElementById("question" + i + "_F").checked = true;
        var z = document.getElementById("question" + i + "_F");
        if ((x) || (y)) {
            count++
        }
        if (count >= 8) {
            botao.disabled = "";
            nameError.classlist.add("d-none");
            nmec.classlist.add("d-none");
            email.classlist.add("d-none");
            degree.classlist.add("d-none");

        }
        else {
            botao.disabled = "disabled";
            nameError.classlist.add("d-block");
            nmec.classlist.add("d-block");
            email.classlist.add("d-block");
            degree.classlist.add("d-block");
            retVal = false;
        }
        return retVal
    }
}