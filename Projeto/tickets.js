$('document').ready(function () {

    var count = 1;

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

    var posição = $('input[name="inlineRadioOptions"]').val().length
    var total = 0

    if (posição > 0) {
        total = parseFloat($("input[type='radio'][name='inlineRadioOptions']:checked").val()) * count;
        console.log('total')
        $('#total').text(total);
    }
})