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
                    window.open("google");
                }
            }
        },
        error: function (result) {
            alert(result.statusText);

        }
    });
});