// Autocomplete 
$(document).ready(function () {
    $("#SearchText").autocomplete({
        minLength: 3,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: 'http://192.168.160.58/Formula1/api/Search/Drivers?q=' + $('#SearchText').val(),
                data: '',
                dataType: "json",
                success: function (data) {
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
            url: 'http://192.168.160.58/Formula1/api/Search/Drivers?q=' + $('#SearchText').val(),
            data: '',
            dataType: "json",
            success: function (data) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    if (nome == data[i].Name) {
                        var id_driver = data[i].DriverId;
                        window.location.replace('./driverDetailsv2.html?id=' + id_driver);
                    }
                }
            },
            error: function (result) {
                alert(result.statusText);

            }
        });
});


// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/drivers');
    //self.baseUri = ko.observable('http://localhost:62595/api/drivers');
    self.displayName = 'Drivers List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.records = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(20);
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
        console.log(list);
        return list;
    };
    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getDrivers...');
       var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
           console.log(data);
            hideLoading();
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


function myFunction() {
    // Declare variables
    self.Name = ko.observable('');
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("SearchText");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


