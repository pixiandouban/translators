{
	"translatorID": "02565b25-1f26-4edd-89ac-f2cdf46ea5fe",
	"label": "Xinhua New Agency (news.cn zh)",
	"creator": "pixiandouban",
	"target": "^https?://www.news.cn",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-22 15:20:09"
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
	if(url.includes('search') || url.includes('q=') ){
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
	item.title = ZU.xpathText(doc, '//div[@class="head-line clearfix"]/h1/span[@class="title"]');
	Z.debug(item.title);
	//var authors=ZU.xpathText(doc, '//meta[@name="author"]/@content');
	//item.creators.push(ZU.cleanAuthor((authors), "author"));
	item.language='zh-hans';
	item.url=url;
	item.abstractNote = ZU.xpathText(doc, '//meta[@name="description"]/@content');
	Z.debug(item.abstractNote);
	item.publicationTitle = "新华社";
	//item.CN = "44-0003";


	var publicationYear = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="year"]/em');
	var publicationDay = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="day"]') ;
	var publicationTime = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="time"]');
	var publicationDate = publicationYear + '/' + publicationDay + ' ' + publicationTime;
	//var publicationDate = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="year"]/em') +'/' +ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="day"]') ;
	//var publicationDate = ZU.xpathText(doc, '//meta[@itemprop="datePublished"]/@content')
	//var publicationDate=doc.body.getElementsByClassName('nfzm-content__publish')[0].getAttribute('data-time');
	Z.debug(publicationDate);
	if (publicationDate) {
		item.date = ZU.strToISO(publicationDate);
	}

	//item.tags = ZU.xpathText(doc, '//meta[@name="keywords"]/@content');

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
		"url": "http://news.cn/worldpro/",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "http://www.news.cn/politics/rs.htm?page=xhrs",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "http://www.news.cn/2021-11/22/c_1128087625.htm",
		"items": [
			{
				"itemType": "newspaperArticle",
				"title": "云南哀牢山4名野外作业失联人员遇难",
				"date": "2021-11-22",
				"language": "zh-hans",
				"libraryCatalog": "Xinhua News Agency (zh)",
				"tags": [],
				"seeAlso": [],
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html",
					}
				]
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.news.cn/world/2021-11/22/c_1211456054.htm",
		"items": [
			{
				"itemType": "newspaperArticle",
				"title": "外媒：全球城市面临“后疫情时代”多重挑战",
				"language": "zh-hans",
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
	}
]
