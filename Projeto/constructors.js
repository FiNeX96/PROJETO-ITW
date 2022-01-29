// Autocomplete 
$(document).ready(function () {
    $("#SearchText").autocomplete({
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: 'http://192.168.160.58/Formula1/api/Search/Constructors?q=' + $('#SearchText').val(),
                data: '',
                dataType: "json",
                success: function (data) {
                    console.log("ola")
                    response($.map(data, function (item) {
                        return item.Name

                    }));
                },
                error: function (result) {
                    alert(result.statusText);
                }
            });
        }
    });
});
    // Search feature ( search and enter both work )

    var input = document.getElementById("SearchText");
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button_search").click();
}
});  
    $('#button_search').click(function () {
        console.log ($('#SearchText').val());
        var nome = $('#SearchText').val();

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: 'http://192.168.160.58/Formula1/api/Search/Constructors?q=' + $('#SearchText').val(),
            data: '',
            dataType: "json",
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    if (nome == data[i].Name) {
                        var id_constructor = data[i].ConstructorId;
                        window.location.replace('./constructorDetails.html?id=' + id_constructor);
                    }
                }
            },
            error: function (result) {
                alert(result.statusText);

            }
        });
});


var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    var listfavs = [];
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Constructors');
    self.displayName = 'Constructors List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(15);
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
        console.log('CALL: getConstructors...');
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


    self.toggleFavourite = function (id) {
        if (self.favourites.indexOf(id) == -1) {
            self.favourites.push(id);
        } else {
            self.favourites.remove(id);
        }
        localStorage.setItem("fav", JSON.stringify(self.favourites()));
    }
    self.SetFavourites = function () {
        let storage;
        try {
            storage = JSON.parse(localStorage.getItem("fav"));
        } catch (e) {
            ;
        }
        if (Array.isArray(storage)) {
            self.favourites(storage)
        }
    }
    console.log(localStorage)
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});