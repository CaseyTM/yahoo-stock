

$(document).ready(function(){
	$('.yahoo-form').submit(function(){
		// NEED TO STOP JS FROM PROCEEDING TOO FAST
		event.preventDefault();
		var symbol = $('#symbol').val();
		console.log(symbol)
			// DYNAMICALLY BUILD THE URL TO USE FOR A GIVEN STOCK
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("'+symbol+'")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json'
		// console.log(url);
		// parameter 1 = where to go? parameter 2 = what to do?
		$.getJSON(url, function(dataJSGotIfAny){
		var stockInfo = dataJSGotIfAny.query.results.quote;
		if(stockInfo.Change.indexOf('+') > -1){
			var classChange = "success";
		}else{
			var classChange = "danger";
		}
		var newHTML = '';
		newHTML += '<tr>';
			newHTML += '<td>'+stockInfo.Symbol+'</td>';
			newHTML += '<td>'+stockInfo.Name+'</td>';
			newHTML += '<td>'+stockInfo.Ask+'</td>';
			newHTML += '<td>'+stockInfo.Bid+'</td>';
			newHTML += '<td class ="'+classChange+'">'+stockInfo.Change+'</td>';		
		newHTML += '</tr>';


		// .html will replace the lines, .append will add new lines each time you req a quote
		$('#stock-body').append(newHTML);
		// console.log("i'm back");
		console.log(stockInfo)

		});
		// console.log("where is the JS?");
	})
});
