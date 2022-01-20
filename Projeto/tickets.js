$('document').ready(function () {

    var count = 0;

    $("#update1").click(function () {
        if (count > 49) {
            $('#counter').text(count);
        }
        else {
            count++;
            $('#counter').text(count);
        }

        $("#update2").click(function () {
            if (count <= 1) {
                $('#counter').text(count);
            }
            else {
                count--;
                $('#counter').text(count);
            }
        })
    })

    $('#submit').click(function () {
        var retVal = true;
        if ($('#inputName').length < 3) {
            retVal = false;
            $('#NameError').addClass('d-block');
            $('#NameError').removeClass('d-none');
            }
        else {
            $('#NameError').removeClass('d-block');
            $('#NameError').addClass('d-none');
        }



        if ($('#inputEmail').length < 3) {
            retVal = false;
            $('#EmailError').addClass('d-block');
            $('#EmailError').removeClass('d-none');
        }
        else {
            $('#EmailError').removeClass('d-block');
            $('#EmailError').addClass('d-none');
        }

        return retVal;
    });

})