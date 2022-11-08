{
	"translatorID": "04106880-3f9f-4dd4-8232-d9b8ac42e237",
	"label": "Yahoo! Japan News",
	"creator": "pixiandouban",
	"target": "^https?://news.yahoo.co.jp/articles/",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-10-29 14:56:46"
}

function detectWeb(doc, url) {
	// TODO: adjust the logic here
	if(url.includes('search')){
		return "multiple";
	}
	else
	{
		return "newspaperArticle";
	}

}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// TODO: adjust the CSS selector
	//var rows = doc.querySelectorAll('ul[class="nfzm-list ui-line"]>li>a') || doc.querySelectorAll('ul[class="nfzm-list ui-line ui-rich"]>li>a') ;
	//var rows = doc.querySelectorAll('ul[class="nfzm-list ui-line"]>li>a, ul[class="nfzm-list ui-line ui-rich"]>li>a');
	//Z.debug(rows);
	/*
	for (let row of rows) {
		// TODO: check and maybe adjust
		let href = row.href;
		Z.debug("href: "+href);
		// TODO: check and maybe adjust
		let title = ZU.xpathText(row, './/div/div/div/header/h5').trim();
		Z.debug("title: "+title);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
	*/
}


function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		Zotero.selectItems(getSearchResults(doc, false), function (items) {
			if (!items) {
				return;
			}
			var articles = [];
			for (var i in items) {
				articles.push(i);
			}
			ZU.processDocuments(articles, scrape);
		});
	}
	else {//newspaperArticle
		scrape(doc, url);
	}
}

function scrape(doc, url) {

	var item = new Zotero.Item("newspaperArticle");

	//item.title = ZU.xpathText(doc, '//head/title');
	item.title = ZU.xpathText(doc, '//div[@class="sc-bRBYWo faerEn"]/article/header/h1');
	//item.title = ZU.xpathText(doc, '//div[@class="nfzm-content__title"]/h1');

	/*
	var authors=ZU.xpathText(doc, '//meta[@name="author"]/@content');
	authors = authors.split(/[\s]+/);
	if(authors.length > 1){
		for( i=0; i < authors.length; i=i+1){
			item.creators.push(ZU.cleanAuthor((authors[i]), "author"));			
		}
	}
	else if(authors.length === 1)
	{
		item.creators.push(ZU.cleanAuthor((authors[0]), "author"));
	}	
	//item.creators.push(ZU.cleanAuthor((authors), "author"));

	*/
	item.language='ja';
	item.url=url;
	item.abstractNote = ZU.xpathText(doc, '//meta[@name="description"]/@content');

	//item.publicationTitle = "南方周末";
	

	//var publicationDate = ZU.xpathText(doc, "(//span[@class='nfzm-content__publish'])[1]");
	var publicationDate=doc.body.getElementsByClassName('nfzm-content__publish')[0].getAttribute('data-time');
	if (publicationDate) {
		item.date = ZU.strToISO(publicationDate);
	}
	
	//item.accessDate = new Date().toISOString().slice(0, 10);
	
	keywords = ZU.xpathText(doc, '//meta[@name="keywords"]/@content');
	//Z.debug(keywords);
	var tags = keywords.split(',');
	//Z.debug(tags);
	for(let i = 0; i < tags.length; i++){
		item.tags[i] = tags[i];
	}
	//Z.debug(item.tags);

	item.attachments.push({
		title: "Snapshot",
		document: doc
	});

	item.complete();

}

/** BEGIN TEST CASES **/
var testCases = [
]
/** END TEST CASES **/
