var favoritos = JSON.parse(localStorage.getItem("fav"));
var favoritos2 = JSON.parse(localStorage.getItem("fav2"));
var favoritos3 = JSON.parse(localStorage.getItem("fav3"))
var vm = function () {
    console.log("ViewModel initiated...");
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable(
        "http://192.168.160.58/Formula1/api/Drivers/Driver?id="
    );
    self.baseUri2 = ko.observable("http://192.168.160.58/Formula1/api/Constructors/Constructor?id=")
    self.baseUri3 = ko.observable("http://192.168.160.58/Formula1/api/Circuits/Circuit?id=")
    self.records = ko.observableArray([]);
    self.recordsv2 = ko.observableArray([])
    self.recordsv3 = ko.observableArray([])
    self.favourites2 = ko.observableArray();
    self.favourites = ko.observableArray();
    self.favourites3 = ko.observableArray();
    self.favourites(favoritos);
    self.favourites2(favoritos2)
    self.favourites(favoritos3)

    //--- Page Events
    self.activate = function (id) {
        console.log("CALL: getFavourites...");
        if (favoritos.length > 0) {
        for (let driverID = 0; driverID < favoritos.length; driverID++) {
            var composedUri = self.baseUri() + favoritos[driverID];
            ajaxHelper(composedUri, "GET").done(function (data) {
                self.records.push(data);
            });
        }
    }
    else{
        $("#drivers").text(" Drivers - no favourite drivers")
    }
        if (favoritos2.length > 0){
        for (let ConstructorId = 0 ; ConstructorId < favoritos2.length; ConstructorId++){
          var composedUri2 = self.baseUri2() + favoritos2[ConstructorId]
          ajaxHelper(composedUri2, "GET").done(function (data) {
            self.recordsv2.push(data);
            hideLoading();
        })
    }
    }
    else{
        $("#constructors").text(" Constructors - No favourite constructors")
    }
        if (favoritos3.length > 0 ){
             
    for (let RaceId = 0 ; RaceId < favoritos3.length; RaceId++){
        var composedUri3 = self.baseUri3() + favoritos3[RaceId]
        ajaxHelper(composedUri3, "GET").done(function (data) {
          self.recordsv3.push(data);
          hideLoading();
      })
    }
  }
  else{
    $("#circuits").text(" Circuits - No favourite circuits")
  }
    };
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        return $.ajax({
            type: method,
            dataType: "json",
            async: false,
            contentType: "application/json",
            url: uri,
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
            },
        });
    }
    self.activate(1);
    function showLoading() {
        $("#myModal").modal("show", {
            backdrop: "static",
            keyboard: false,
        });
    }
    // desaparecer o modal//
    function hideLoading() {
        $("#myModal").on("shown.bs.modal", function (e) {
            $("#myModal").modal("hide");
        });
    }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
