function rpttable (config) {

  var table = $('<div class="rpt-table"/>');

  var header = $('<div class="rpt-table-header"/>');

  var body = $('<div class="rpt-table-body"/>');

  table.append(header);
  table.append(body);

  var rowHeader = $('<div class="rpt-table-row-header"/>');
  
  var headerTemplate = [];

  for (var columnName in config.columns) {

    var column = $('<div class="rpt-table-cell rpt-table-header"/>');
    column.html(columnName);

    if (config.columns[columnName].style)
      for (var prop in config.column[columnName].style) 
        column.css(prop, config.columns[columnName].style[prop]);

    rowHeader.append(column);

    headerTemplate[config.columns[columnName].field || columnName] = "";

  }

  header.append(rowHeader);

  table.addRow = function (data) {

    var row = $('<div class="rpt-table-row"/>');
    var cellCount = 0;

    for (var field in data) {

      if (headerTemplate[field] != null) {

        var cell = $('<div class="rpt-table-cell rpt-table-cell-' + cellCount + '"/>');
        cell.html(data[field]);
        row.append(cell);
        cellCount++;

      }

    }

    body.append(row);

  }

  return table;

}
