var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/Formula1/api/Races/Race?id=');
    self.baseUri2 = ko.observable('http://192.168.160.58/Formula1/api/Drivers/Driver?id=');

    self.displayName = 'Constructor Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.ImageUrl = ko.observable('');
    self.RaceId = ko.observable('');
    self.Circuit = ko.observable('');
    self.Year = ko.observable('');
    self.Name = ko.observable('');
    self.Round = ko.observable('');
    self.Date = ko.observable('');
    self.Time = ko.observableArray('');
    self.Url = ko.observable('');
    self.Results = ko.observable('');

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getRaceDetails...');
        var composedUri = self.baseUri() + id;
        var composedUri2 = self.baseUri2() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            self.RaceId(data.RaceId);
            self.Circuit(data.Circuit);
            self.Year(data.Year);
            self.Name(data.Name);
            self.Round(data.Round);
            self.Date(data.Date);
            self.Time(data.Time);
            self.Url(data.Url);
            self.ImageUrl(data.ImageUrl);
            self.Results(data.Results);
            hideLoading();
        });
        ajaxHelper(composedUri2, 'GET').done(function (data) {
            self.Wins(data.Wins)
            position = data.Career[0].Position
            function suffix(value) {
                if (value == 1 || value == 21 || value == 31 || value == 41 || value == 51)
                    return value + "st";
                else if (value == 2 || value == 22 || value == 32 || value == 42 || value == 52)
                    return value + "nd";
                else if (value == 3 || value == 23 || value == 33 || value == 43 || value == 53)
                    return value + "rd";
                else
                    return value + "th";
            }
            self.LastPos(suffix(position));
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
    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
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

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
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