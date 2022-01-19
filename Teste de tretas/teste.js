
groupedArticles = [
    [article1, article2, article3],
    [article4, article5, article6]
]


this.grouped = ko.computed(function () {
    var rows = [], current = [];
    rows.push(current);
    for (var i = 0; i < this.items.length; i += 1) {
        current.push(this.items[i]);
        if (((i + 1) % 4) === 0) {
            current = [];
            rows.push(current);
        }
    }
    return rows;
}, this);