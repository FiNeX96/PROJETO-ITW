var viewModel = function () {
    var self = this;

    self.users = [{
        name: "name 1",
        age: "32",
        nat: "PT"
    }, {
        name: "name 2"
    }, {
        name: "name 3"
    }, {
        name: "name 4"
    }, {
        name: "name 5"
    }, {
        name: "name 6"
    }, {
        name: "name 7"
    }, {
        name: "name 8"
    }];

    self.groupedUsers = ko.computed(function () {
        var rows = [];

        self.users.forEach(function (user, i) {
            if (i % 3 == 0)
                rows[i / 3] = [];

            rows[Math.floor(i / 3)][i % 3] = user;
        });

        return rows;
    });
};

ko.applyBindings(new viewModel());
