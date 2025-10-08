/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 89.49100188020414, "KoPercent": 10.508998119795864};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7759065839012642, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.4478876857054534, 500, 1500, "POST /character "], "isController": false}, {"data": [0.876644912806248, 500, 1500, "GET  /character/id "], "isController": false}, {"data": [0.8920617492898649, 500, 1500, "DELETE /character/id "], "isController": false}, {"data": [0.8876656598375406, 500, 1500, "PUT /character/id "], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1757256, 184670, 10.508998119795864, 382.51263333286795, 0, 148636, 121.0, 1036.0, 1950.9500000000007, 7074.0, 1909.7142149196832, 880.0790765511179, 375.0986966309512], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["POST /character ", 439944, 46160, 10.49224446747768, 1188.3600412779786, 0, 148636, 744.0, 3576.9000000000015, 3977.0, 16105.990000000002, 478.11321205824595, 227.90523032266154, 100.72216234763636], "isController": false}, {"data": ["GET  /character/id ", 439309, 46170, 10.509686803593826, 106.37503898167054, 0, 15983, 57.0, 403.0, 536.0, 1006.0, 508.0801947620122, 234.19516418226556, 84.50590519627998], "isController": false}, {"data": ["DELETE /character/id ", 439001, 46170, 10.517060325602904, 118.08411142571393, 0, 1585, 122.0, 294.90000000000146, 397.0, 739.9900000000016, 508.02833379815706, 231.70342388365657, 96.89026739559117], "isController": false}, {"data": ["PUT /character/id ", 439002, 46170, 10.51703636885481, 115.694677928574, 0, 1598, 109.0, 282.0, 484.0, 737.9900000000016, 508.0165573298123, 228.42355804127817, 110.72063721613692], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["408/Request Timeout", 15, 0.008122597065034928, 8.536035728431145E-4], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 58, 0.031407375318135054, 0.003300600481660043], "isController": false}, {"data": ["404/Not Found", 16356, 8.856879839714084, 0.930769335828132], "isController": false}, {"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 168241, 91.10359018790274, 9.574074579913228], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1757256, 184670, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 168241, "404/Not Found", 16356, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 58, "408/Request Timeout", 15, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["POST /character ", 439944, 46160, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 46087, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Connection reset", 58, "408/Request Timeout", 15, "", "", "", ""], "isController": false}, {"data": ["GET  /character/id ", 439309, 46170, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 43355, "404/Not Found", 2815, "", "", "", "", "", ""], "isController": false}, {"data": ["DELETE /character/id ", 439001, 46170, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 38184, "404/Not Found", 7986, "", "", "", "", "", ""], "isController": false}, {"data": ["PUT /character/id ", 439002, 46170, "Non HTTP response code: java.net.BindException/Non HTTP response message: Can't assign requested address", 40615, "404/Not Found", 5555, "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
