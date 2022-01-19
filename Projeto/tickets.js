$('document').ready(function () {

    var count = 0;

    $("#update1").click(function () {
        count++;
        $('#counter').text(count);
    })

    $("#update2").click(function () {
        if (count <= 0) {
            $('#counter').text(count);
        }
        else {
            count--;
            $('#counter').text(count);
        }
    })
})


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

//--- start ....
showLoading();
var pg = getUrlParameter('page');
console.log(pg);
if (pg == undefined)
    self.activate(1);
else {
    self.activate(pg);
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});