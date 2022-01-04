function validate() {
    var retVal = true;
    var _cursoselecionado = document.getElementById("Curso:").selectedIndex;
    var cursosArray = document.getElementById("curso").options;
    var _cursoError = document.getElementById("cursoError");
    var _nomeError = document.getElementById("nomeError");
    if (cursosArray[_cursoselecionado].value == "") {
        retVal = false;
        _cursoError.classlist.add("d-block");
        _cursoError.classlist.remove("d-none");
    }
    else {
        _nomeError.classlist.remove("d-block");
        _nomeError.classlist.add("d-none")
    }
    var nome = document.getElementById("nome")
    if (nome.trim.length() < 3) {
        retVal = false;
        _nomeError.classlist.add("d-block")
        _nomeError.classlist.add("d-none")
    }
    else {
        _nomeError.classlist.add("d-none")
        _nomeError.classlist.add("d-block")
    }
}