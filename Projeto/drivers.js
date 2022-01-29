 
   

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
    self.favourites = ko.observableArray([]) 
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
    $("#SearchText").autocomplete({
        minLength: 2,
        source: function (request, response) {
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: 'http://192.168.160.58/Formula1/api/Search/Drivers?q=' + $('#SearchText').val(),
                data: '',
                dataType: "json",
                success: function (data) {
                    autocompleteRecords = data;
                    response($.map(data, function (item) {
                        return item.Name;
                    }));
                },
                error: function (result) {
                    alert(result.statusText);
                }
            });
        },

        
        // O SEARCH TÁ A CORRER BEM (NÃO COM O VALOR DO SELECT MAS SIM COM O VALOR DA CAIXA, MAS SÓ DÁ O SEARCH QND CLICO NUM SELECT, TEM DE DAR SEARCH QUANDO DOU ENTER OU BOTÃO)
            select: function (event, ui) {
            const search = ui.item.value;
            const newRecords = [];

            for (const d of autocompleteRecords) {
                if (d.Name.includes(search)) {
                    newRecords.push(d);
                }
            }
            self.records(newRecords);
        }
    });
   
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
           self.SetFavourites();
           
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
  self.toggleFavourite = function(id) {
      if (self.favourites.indexOf(id)== -1 ){
          self.favourites.push(id);
      }else{
          self.favourites.remove(id);
      }
      localStorage.setItem("fav", JSON.stringify(self.favourites()));
      }
      self.SetFavourites = function() {
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



      
      $("#button_delete").click(function(pg){
        window.location.replace("drivers.html");
        $("#SearchText").val('')
     })
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});



