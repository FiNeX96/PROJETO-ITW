var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Seasons');
    self.baseUri2 = ko.observable('http://192.168.160.58/Formula1/api/Statistics/Season?year=');
    self.baseUri3 = ko.observable('http://192.168.160.58/Formula1/api/Seasons/Season?year=');
    self.error = ko.observable('');
    self.displayYear = ko.observable ();
    self.passingMessage = ko.observable('');
    self.Url = ko.observable('');
    self.Races = ko.observable();
    self.Countries = ko.observable();
    self.Drivers = ko.observable();
    self.Winner = ko.observable ();
    self.CWinner = ko.observable ();
    self.records = ko.observableArray([]);
    self.records2 = ko.observableArray([]);
    self.records3 = ko.observableArray([])
    self.Constructors = ko.observable()
    self.currentPage = ko.observable(1);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () { 
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    totalPages = ko.observable(72)
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getSeason...');
       var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + 1;
        ajaxHelper(composedUri, 'GET').done(function (data) {
           hideLoading();
           console.log(data);
           self.displayYear(data.List[0].Year)
           self.Url(data.List[0].Url)
           self.currentPage(data.CurrentPage);
           self.hasNext(data.HasNext);
           self.hasPrevious(data.HasPrevious); 
           self.baseUri2('http://192.168.160.58/Formula1/api/Statistics/Season?year=' + data.List[0].Year)
           self.baseUri3('http://192.168.160.58/Formula1/api/Seasons/Season?year=' + data.List[0].Year)
        ajaxHelper(self.baseUri2(), 'GET').done(function (data) {
               console.log(data)
               self.records(data.DriverStandings)
               self.records2(data.ConstructorStandings)
               self.Countries(data.Countries)
               self.Races (data.Races)
               self.Constructors(data.Constructors)
               self.Drivers(data.Drivers)
               self.Winner(data.DriverStandings[0].Name)
               self.CWinner(data.ConstructorStandings[0].Name)
               ajaxHelper(self.baseUri3(), 'GET').done(function (data) {
               self.records3(data.Races)
               })
           });
       });
    };

    
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            dataType: 'json',
            contentType: 'application/json',
            url: uri,
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function sleep(milliseconds) {
        const start = Date.now();
        while (Date.now() - start < milliseconds);
    }


    // aparecer o modal //
    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    // desaparecer o modal//
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL=", sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }

    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});


$(document).ready(function(){
$("#showDStand").click(function(){
  $("#tableDStand").removeClass("d-none")
  $("#tableDStand").addClass("d-block")
  $("#tableCStand").addClass("d-none");
  $("#tableRaces").addClass("d-none");
  $("#Hide").removeClass("d-none")
  $("#Hide").addClass("d-block")
})
$("#showCStand").click(function(){
    $("#tableCStand").removeClass("d-none")
    $("#tableCStand").addClass("d-block");
    $("#tableDStand").addClass("d-none");
    $("#tableRaces").addClass("d-none");
    $("#Hide").removeClass("d-none")
    $("#Hide").addClass("d-block")
})
$("#showRaces").click(function(){
    $("#tableRaces").removeClass("d-none")
    $("#tableRaces").addClass("d-block");
    $("#tableDStand").addClass("d-none");
    $("#tableCStand").addClass("d-none");
    $("#Hide").removeClass("d-none")
    $("#Hide").addClass("d-block")
})
$("#Hide").click(function(){
    $("#tableCStand").removeClass("d-block");
    $("#tableCStand").addClass("d-none");
    $("#tableRaces").removeClass("d-block");
    $("#tableRaces").addClass("d-none");
    $("#tableDStand").removeClass("d-block");
    $("#tableDStand").addClass("d-none");
    $("#Hide").removeClass("d-block")
    $("#Hide").addClass("d-none")
})
})
document.getElementById("SearchText")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("button_search").click();
    }
});