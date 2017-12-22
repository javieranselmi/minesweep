var rows = 16;
var columns = 16;
var mines = 12;

function reset() {

    $.ajax({
        url: "api/game/",
        method: 'POST',
        data: {
            "height": rows,
            "width": columns,
            "time": 300,
            "mines": mines
        }
    })
        .done(function (data) {
            console.log("Game reset!", data);
            refreshBoard(data, columns, rows);
        });
};

function clickTile(tile) {

   var top = $(tile).data('top');
   var left = $(tile).data('left');

    $.ajax({
        url: "api/game/tile",
        method: 'PUT',
        contentType: "application/json",
        data: JSON.stringify({
           "top": top,
           "left": left
        })
    })
        .done(function (data) {
            console.log("Game reset!", data);
            refreshBoard(data, columns, rows);
        });
};

function refreshBoard(data, columns, rows) {
    $container = $('.container').empty();
    _.times(rows, function(rowIndex) {
        var rowClassName = 'row-' + rowIndex;
        $container.append('<div class="row '+ rowClassName +'"></div>');
        _.times(columns, function(colIndex) {

            var tile = findTile(rowIndex, colIndex, data.tiles);
            var tileClass = null;
            var tileLegend = '';

            if (tile.state === 'hidden') {
                tileClass = 'tile-hidden';
            } else {
                if (tile.content === 'mine') {
                    tileClass = 'tile-mine';
                } else {
                    tileClass = 'tile-empty';
                    tileLegend = tile.mineProximityValue;
                }
            }
            $container.find('.row-'+ rowIndex).append(
                '<div '+' data-top="'+rowIndex+'" data-left="'+colIndex+'"'+'class="tile ' + tileClass + '" onclick="clickTile(this)">'
                + tileLegend + '</div>')
        })
    });
}

function findTile(top, left, tiles) {
    var tile = _.find(tiles, {'top' : top, 'left': left});
    if (tile) {
        return tile
    } else {
        throw new Error('Tile in position ('+top+', '+left+') not found');
    }
}