function reset(){
	$(".searchResults").removeClass("show");
	$(".main").removeClass("main-to-top");
	$("#searchTerm").val("");
	$(".inputContainer").hide();
	$(".icon").show("2000", "swing");
}

$("form").on("submit", function(e){
	e.preventDefault();
	let searchTerm = $("#searchTerm").val();
	if (searchTerm){
		$.getJSON("https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srlimit=5&srsearch=" + searchTerm, function(data){
			let infoArray = data.query.search;
			infoArray.forEach(function(el, i){
				let title = infoArray[i].title;
				let snippet = infoArray[i].snippet;
				$(".childResult").eq(i).click(function(e){
					window.open("https://en.wikipedia.org/wiki/"+title, "wiki_window")
				});
				$(".childResult h3").eq(i).html(title);
				$(".childResult p").eq(i).html(snippet + "...");
			})
		});
		$(".main").addClass("main-to-top");
		$(".searchResults").addClass("show");
	}
	else {
		reset();
	}
});

$("#clear").on("click", function(e){
	e.stopPropagation();
	console.log("clear triggered");
	reset();
})

$(".icon").on("click", function(e){
	$(this).hide();
	$(".inputContainer").show();
	$("input").trigger("focus");
});