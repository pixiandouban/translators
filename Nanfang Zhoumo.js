{
	"translatorID": "6264f091-1e9e-482e-adb8-4eb6bc9ddacf",
	"label": "Nanfang Zhoumo",
	"creator": "pixiandouban",
	"target": "^https?://www\\.infzm\\.com",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-28 03:58:42"
}

// Made by pixiandouban; unfinished
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
	if(url.includes('term_id=') || url.includes('k=')){
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
	var rows = doc.querySelectorAll('ul[class="nfzm-list ui-line"]>li>a, ul[class="nfzm-list ui-line ui-rich"]>li>a');
	Z.debug(rows);
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

	const ogMetadataCache = new Map();
	const nodeList = doc.head.querySelectorAll(':scope meta[property^="og:"]');
	for (const node of nodeList) {
		ogMetadataCache.set(node.getAttribute("property"), node.content);
	}

	//item.title = ZU.xpathText(doc, '//head/title');
	item.title = ZU.xpathText(doc, '//div[@class="nfzm-content__title"]/h1');
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
	item.language='zh-hans';
	item.url=url;
	item.abstractNote = ZU.xpathText(doc, '//meta[@name="description"]/@content');
	item.publicationTitle = "南方周末";
	item.CN = "44-0003";

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
		"url": "https://www.infzm.com/search?k=%E7%96%AB%E6%83%85&from=keywords",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.infzm.com/contents?term_id=120&form_content_id=217729",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.infzm.com/contents/217729",
		"items": [
			{
				"itemType": "newspaperArticle",
				"language": "zh-hans",
				"title": "五十年后回看芬利的《古代经济》",
				"date": "2021-11-14"
			}
		]
	}
]
/** END TEST CASES **/
