{
	"translatorID": "36548d03-b980-48a3-a7eb-d3271e51faec",
	"label": "Central News Agency (Taiwan)",
	"creator": "pixiandouban",
	"target": "^https?://www.cna.com.tw",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-23 10:20:05"
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
	const ogType = doc.head.querySelector('meta[property="og:type"]')
	if(url.includes('list') || url.includes('q=') ){
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

	//item.title = ZU.xpathText(doc, '//head/title');
	item.title = ZU.xpathText(doc, '//div[@class="centralContent"]/h1/span');
	Z.debug(item.title);
	//var authors=ZU.xpathText(doc, '//meta[@name="author"]/@content');
	//item.creators.push(ZU.cleanAuthor((authors), "author"));
	item.language='zh-tw';
	item.url=url;
	item.abstractNote = ZU.xpathText(doc, '//meta[@property="og:description"]/@content');
	Z.debug(item.abstractNote);
	item.publicationTitle = "中央通訊社";
	//item.CN = "44-0003";

	//var publicationDate = ZU.xpathText(doc, '//div[@class="centralContent"]/div[@class="timeBox"]/div[@class="updatetime"]/span');
	var publicationDate = ZU.xpathText(doc, '//meta[@itemprop="datePublished"]/@content')
	//var publicationDate=doc.body.getElementsByClassName('nfzm-content__publish')[0].getAttribute('data-time');
	Z.debug(publicationDate);
	if (publicationDate) {
		item.date = ZU.strToISO(publicationDate);
	}

	item.tags = [];

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

/**Begin TEST CASE**/
var testCases = [
	{
		"type": "web",
		"url": "https://www.cna.com.tw/search/hysearchws.aspx?q=covid",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.cna.com.tw/news/firstnews/202111225003.aspx",
		"items": [
			{
		    	"itemType": "newspaperArticle",
		    	"title": "大S汪小菲交往20天閃婚 10年磨合紛擾不斷離婚收場",
		    	"date": "2021-11-22",
		    	"language": "zh-tw",
		    	"libraryCatalog": "Central News Agency (Taiwan)",
		    	"tags": [],
		    	"seeAlso": [],
		    	"attachments": [
		    		{
		    			"title": "Snapshot",
		    			"mimeType": "text/html"
		    		}
		    	]
			}

		]
	},
	{
		"type": "web",
		"url": "https://www.cna.com.tw/list/asc.aspx",
		"items": "multiple"
	}
]
