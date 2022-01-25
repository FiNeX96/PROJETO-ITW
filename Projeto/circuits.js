var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    var listfavs = [];
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Circuits');
    self.baseUri2 = ko.observable('http://192.168.160.58/Formula1/api/Circuits/Locations');
    self.displayName = 'Circuits List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(10);
    self.totalRecords = ko.observable(50);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getCircuits...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            // ISTO ESTÁ BASICAMENTE A DEFINIR AS VARIÁVEIS QUE ELE TEM LÁ EM CIMA NO KO
            self.records(data.List);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.PageCount);
            self.totalRecords(data.Total);
        });
    };

    setFavorites = function () {
        botao = $(event.target).hasClass("btn-danger");
        if (botao == true) {
            event.target.classList.remove("btn-danger");
        }
        else {
            event.target.classList.add("btn-danger");
        }

        // a ideia aki é tentar ter um mapa ( dicionário, em que a key é o driverID e o value é a entrada da lista correspondente )

    }
    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
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

    $("#mapid").css("height", window.innerHeight - 214);
    $(window).resize(function () {
        $("#mapid").css("height", window.innerHeight - 214);
    });
    var mymap = L.map('mapid').setView([36.75, -17], 6);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2JyaXN0IiwiYSI6ImNreXVuc2NnazFwNnAybnA2cGFhbjJ3M3AifQ.VIsA_yNxSGwPCduC9xWDpg', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);
    //--- Toooooodos os pontos
    L.marker([39.458190000, -31.130100000], { opacity: 0.80 })
        .bindTooltip('Flores (Aer&#xF3;dromo)').openTooltip()
        .addTo(mymap);
    //--- (…)
    L.marker([39.466666670, -8.050000000], { opacity: 0.80 })
        .bindTooltip('Alvega').openTooltip()
        .addTo(mymap);
    var popup = L.popup();
    mymap.on('click', function (e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(mymap);
    });
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
