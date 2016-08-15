app.filter("aposFilter", function () {
    return function (input, length) {
        if (input == null || input == "") {
            return input;
        }
        if (input.length > length) {
            return input.substr(0, length) + "...";
        }
        return input;
    }
}).filter("dateFilter", function ($filter) {
    return function (input, format) {
        if (input == null || input == "") {
            return input;
        }
        var timeStr = input.replace(/(\d{0,4})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$2/$3/$1 $4:$5:$6");
        var milliSeconds = Date.parse(timeStr);
        return $filter("date")(milliSeconds, format);
    }
}).filter("strFilter", function () {
    return function (input, length) {
        if (input == null || input == "") {
            return input;
        }
        var ins = input.substr(0, length);
        return ins;
    }
});