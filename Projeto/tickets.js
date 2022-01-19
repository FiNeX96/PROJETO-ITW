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