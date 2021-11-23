{
	"translatorID": "799d2998-f6cc-41ca-b8fa-041bfcedd6aa",
	"label": "The Paper",
	"creator": "pixiandouban",
	"target": "^https?://www.thepaper.cn",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-23 07:54:19"
}

function detectWeb(doc, url) {
	// TODO: adjust the logic here
	if(url.includes('channel')){
		return "multiple";
	}
	else
	{
		return "newspaperArticle";
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
	
	var tt = ZU.xpathText(doc, '//div[@class="newscontent"]/h1[@class="news_title"]');
	Z.debug(tt);
	item.title=tt;
	var authors = doc.body.querySelector("div.news_about > p");
	authors=authors.innerText.replace("澎湃新闻记者 ", "");
	Z.debug(authors);
	item.creators.push(ZU.cleanAuthor((authors), "author"));
	Z.debug(item.creators);
	item.language='zh-CN';
	item.url=url;
	item.abstractNote = ZU.xpathText(doc, '//meta[@name="Description"]/@content');
	Z.debug(item.abstractNote);
	item.publicationTitle = "澎湃新闻";
	//item.CN = "44-0003";	
	
	var pubDate = doc.body.querySelector(".newscontent").querySelectorAll('p');
	var publicationDate = pubDate[1].innerText.replace(" 来源：澎湃新闻", "");
	//var publicationDate = ZU.xpathText(doc, "(//div[@class='bd_block'])/span[@id='pubtime_baidu']");
	//var publicationDate=doc.body.getElementsByClassName('nfzm-content__publish')[0].getAttribute('data-time');
	if (publicationDate) {
		item.date = ZU.strToISO(publicationDate);
	}
	Z.debug(publicationDate);
	
	//item.accessDate = new Date().toISOString().slice(0, 10);
	
	item.tags=[];
	
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
		"url": "https://www.thepaper.cn/channel_36079",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.thepaper.cn/newsDetail_forward_10577804",
		"items": [
			{
				"itemType": "newspaperArticle",
				"language": "zh-CN",
				"title": "美媒：新冠疫情之下，美国多个州枪支暴力事件较往年增加",
				"date": "2020-12-29"
			}
		]
	}
]
/** END TEST CASES **/
