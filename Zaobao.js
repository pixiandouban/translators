{
	"translatorID": "f2999aac-a13f-4b5c-807e-6fd06c331ce7",
	"label": "Zaobao",
	"creator": "pixiandouban",
	"target": "^https?://www.zaobao.com(.sg)?",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-26 04:18:17"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2020 Pixiandouban <- TODO

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/


function detectWeb(doc, url) {
	// TODO: adjust the logic here
	const ogType = doc.head.querySelector('meta[property="og:type"]');
	if(url.includes('search')){
		return "multiple";
	}	
	else if(ogType && ogType.content === "NewsArticle")
	{
		return "newspaperArticle";
	}
	else{
		return false;
	}
}


function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	// TODO: adjust the CSS selector
	var rows = doc.querySelectorAll('li[class="search-result row"]');
	for (let row of rows) {
		// TODO: check and maybe adjust
		let href = ZU.xpathText(row,'(.//div/a[@class="headline"]/@href)');
		Z.debug(href);
		// TODO: check and maybe adjust
		let title = ZU.trimInternal(row.textContent);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
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
	else if(detectWeb(doc, url) == "newspaperArticle" ){
		scrape(doc, url);
	}
}

function scrape(doc, url) {
	var item = new Zotero.Item("newspaperArticle");

	//item.title = ZU.xpathText(doc, '//head/title');
	item.title = ZU.xpathText(doc, '//meta[@property="og:title"]/@content');
	//Z.debug(item.title);
	
	var authors = ZU.xpathText(doc, '//h4[@class="title-byline byline"]/a'); 
	//Z.debug(authors);
	if(authors){
		item.creators.push(ZU.cleanAuthor((authors), "author"));		
	}
	item.language='zh-hans';
	item.url= ZU.xpathText(doc, '//meta[@property="og:url"]/@content') || url;
	item.abstractNote = ZU.xpathText(doc, '//meta[@property="og:description"]/@content');
	Z.debug(item.abstractNote);
	item.publicationTitle = "联合早报";
	//item.ISSN = "44-0003";

	var pubDate = doc.body.querySelector("div.col-12.col-xl.article-byline > h4.title-byline.date-published");
	var publicationDate = pubDate.innerText.replace("发布 / ", "")
	//Z.debug(pubDate);
	Z.debug(publicationDate);
	if (publicationDate) {
		item.date = ZU.strToISO(publicationDate);
	}
	
	var keywords = ZU.xpathText(doc, '//meta[@name="keywords"]/@content');
	var tags = keywords.split(/, /);
	for(let i = 0; i < tags.length; i++){
		item.tags[i] = tags[i];
	}
	Z.debug(item.tags);
	
	//item.accessDate = new Date().toISOString().slice(0, 10);

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
		"url": "https://www.zaobao.com.sg/news/world",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.zaobao.com.sg/search/site/%E5%A4%A9%E6%B0%94",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.zaobao.com.sg/entertainment/story20211122-1215899",
		"items": [
			{
				"itemType": "newspaperArticle",
				"language": "zh-hans",
				"title": "联合声明证实离婚 大S：我希望小菲永远过得比我好",
				"date": "2021-11-22"
			}
		]
	}
]
/** END TEST CASES **/
