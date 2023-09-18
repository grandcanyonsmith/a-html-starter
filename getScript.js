$.getJSON('BDR.json', function(data) {
    $.each(data, function(key, val) {
        $('main').append('<section class="mb-4 border border-gray-300 p-5 rounded-lg bg-gray-200"><h2 class="mb-4 text-2xl">' + key + '</h2><p class="text-lg">' + val + '</p></section>');
    });
});
