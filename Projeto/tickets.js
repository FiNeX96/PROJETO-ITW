var count = 1;
$('document').ready(function () {
    $("#update1").click(function () {
        if (count > 19) {
            $('#counter').text(count);
        }
        else {
            count++;
            $('#counter').text(count);
        }
    })

    $("#update2").click(function () {
            if (count <= 1) {
                $('#counter').text(count);
            }
            else {
                count--;
                $('#counter').text(count);
            }
    })

    $('#submit').click(function () {
        var retVal = true;
        if ($('#inputName').val().length < 3) {
            retVal = false;
            $('#NameError').addClass('d-block');
            $('#NameError').removeClass('d-none');
            }
        else {
            $('#NameError').removeClass('d-block');
            $('#NameError').addClass('d-none');
        }



        if ($('#inputEmail').val().indexOf('@') <= -1) {
            retVal = false;
            $('#EmailError').addClass('d-block');
            $('#EmailError').removeClass('d-none');
        }
        else {
            $('#EmailError').removeClass('d-block');
            $('#EmailError').addClass('d-none');
        }


        if ($('#Race').val() == 0) {
            retVal = false;
            $('#RaceError').addClass('d-block');
            $('#RaceError').removeClass('d-none');
        }

        else {
            $('#RaceError').removeClass('d-block');
            $('#RaceError').addClass('d-none');
        }

        return retVal;
    });

    $('#submit1').click(function () {
        var posição = $('input[name="inlineRadioOptions"]:checked').length;
        var retVal = true;
        if (posição <= 0) {
            retVal = false;
            $('#positionError').addClass('d-block');
            $('#positionError').removeClass('d-none');
        }
        else {
            $('#positionError').removeClass('d-block');
            $('#positionError').addClass('d-none');
        }
        return retVal;
    })
})

    function pricechecker(){
    var posição = $('input[name="inlineRadioOptions"]:checked').length
    if (posição > 0) {
        total = parseFloat($("input[name='inlineRadioOptions']:checked").val() * count).toFixed(2);
        $('#total').text(total + "€");
        }
}

