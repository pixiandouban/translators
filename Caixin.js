{
	"translatorID": "4b37e3d7-f9f3-4904-8b91-6b58fc3c5bef",
	"label": "Caixin",
	"creator": "pixiandouban",
	"target": "^https?://[a-z]+.caixin.com",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-24 02:44:38"
}

function detectWeb(doc, url) {
	// TODO: adjust the logic here
	//var term= "https://opinion.caixin.com/2021-11-15/101805072.html";
	var opinionArticle = new RegExp(/^https:\/\/opinion\.{1}caixin.*html$/); //Opinion article
	/*
	if (opinionArticle.test(term)){
		Z.debug("valid");
	}
	else{
		Z.debug("Invalid");
	}
	*/
	
	if (ZU.xpathText(doc, '//meta[@property="og:type"]/@content') == "article"  || opinionArticle.test(url) ) {
		return 'newspaperArticle';
	}	
	else if(url.includes('blog'))
	{
		return "blogPost";
	}
	else 
	{
		return "multiple";
	}
}

/*
function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// TODO: adjust the CSS selector
	var rows = doc.querySelectorAll('h2>a.title[href*="/article/"]');
	for (let row of rows) {
		// TODO: check and maybe adjust
		let href = row.href;
		// TODO: check and maybe adjust
		let title = ZU.trimInternal(row.textContent);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
}
*/

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		//Zotero.selectItems(getSearchResults(doc, false), function (items) {
		//	if (items) ZU.processDocuments(Object.keys(items), scrape);
		//});
	}
	else {//newspaperArticle
		scrape(doc, url);
	}
}

function scrape(doc, url) {
	var item = new Zotero.Item("newspaperArticle");
	
	var tt = ZU.xpathText(doc, '//meta[@property="og:title"]/@content')
			 || ZU.xpathText(doc, '//div[@id="the_content"]/div[@id="conTit"]/h1').trim();
	Z.debug(tt);
	item.title=tt;
	//var authors=ZU.xpathText(doc, '//meta[@name="author"]/@content');
	var authors=doc.getElementById('author_baidu').innerText;
	authors=authors.replace("作者：", "").split(/[，、\s]+/);
	Z.debug(authors);
	if(authors.length > 1){
		for( i=0; i < authors.length; i=i+1){
			item.creators.push(ZU.cleanAuthor((authors[i]), "author"));			
		}
	}
	else if(authors.length === 1)
	{
		item.creators.push(ZU.cleanAuthor((authors[0]), "author"));
	}
	Z.debug(item.creators);
	
	item.language='zh-hans';
	item.url=url;
	
	item.abstractNote = ZU.xpathText(doc, '//meta[@property="og:description"]/@content') 
						|| ZU.xpathText(doc, '//meta[@name="description"]/@content');
	Z.debug(item.abstractNote);
	item.publicationTitle = "财新 Caixin";
	//item.CN = "44-0003";	
	
	var publicationDate = ZU.xpathText(doc, "(//div[@class='bd_block'])/span[@id='pubtime_baidu']");
	//var publicationDate=doc.body.getElementsByClassName('nfzm-content__publish')[0].getAttribute('data-time');
	if (publicationDate) {
		item.date = ZU.strToISO(publicationDate);
	}
	Z.debug(publicationDate);
	//item.accessDate = new Date().toISOString().slice(0, 10); // Zotero will retrieve automatically	
	
	item.attachments.push({
		title: "Snapshot",
		document: doc
	});
	
	item.complete();
	
	/*
	var translator = Zotero.loadTranslator('web');
	// Embedded Metadata
	translator.setTranslator('6264f091-1e9e-482e-adb8-4eb6bc9ddacf');
	// translator.setDocument(doc);
	
	translator.setHandler('itemDone', function (obj, item) {
		// TODO adjust if needed:
		item.section = "News";
		item.complete();
	});

	translator.getTranslatorObject(function (trans) {
		trans.itemType = "newspaperArticle";
		// TODO map additional meta tags here, or delete completely
		trans.addCustomFields({
			'twitter:description': 'abstractNote'
		});
		trans.
		trans.doWeb(doc, url);
	});
	*/
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://search.caixin.com/newsearch/search?keyword=%E5%A4%A9%E6%B0%94&x=0&y=0&channel=&time=&type=1&sort=1&startDate=&endDate=&special=false",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://weekly.caixin.com/2021-11-19/101807247.html",
		"items": [
			{
				"itemType": "magazineArticle",
				"language": "zh-hans",
				"title": "最新封面报道｜气候大妥协"
			}
		]
	},
	{
		"type": "web",
		"url": "https://fanpusci.blog.caixin.com/archives/252111",
		"items": "blogPost"
	},
	{
		"type": "web",
		"url": "https://finance.caixin.com/2021-11-22/101808525.html",
		"items": [
			{
				"itemType": "newspaperArticle",
				"language": "zh-hans",
				"title": "B站拿下支付牌照 即将开展直播电商内测",
				"date": "2021-11-22"
			}
		]
	},
	{
		"type": "web",
		"url": "https://economy.caixin.com/2021-11-22/101808495.html",
		"items": [
			{
				"itemType": "newspaperArticle",
				"language": "zh-hans",
				"title": "两名主播偷逃税被查处 直播行业征税难点在哪",
				"date": "2021-11-22"
			}
		]
	}
]
/** END TEST CASES **/
