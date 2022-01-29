var favoritos = JSON.parse(localStorage.getItem("fav"));
var vm = function () {
    console.log("ViewModel initiated...");
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable(
        "http://192.168.160.58/Formula1/api/Drivers/Driver?id="
    );
    self.records = ko.observableArray([]);
    self.favourites = ko.observableArray();
    self.favourites(favoritos);

    //--- Page Events
    self.activate = function (id) {
        console.log("CALL: getFavourites...");
        for (let driverID = 0; driverID < favoritos.length; driverID++) {
            var composedUri = self.baseUri() + favoritos[driverID];
            ajaxHelper(composedUri, "GET").done(function (data) {
                self.records.push(data);
                hideLoading();
            });
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
