{
	"translatorID": "a01b62e2-2a25-4667-8f38-6d3a515865ed",
	"label": "Guancha",
	"creator": "pixiandouban",
	"target": "^https?://www.guancha.cn",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-23 03:38:43"
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
	//const ogType = doc.head.querySelector('meta[property="og:type"]')
	if(url.includes('s=')){
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

	item.title = ZU.xpathText(doc, '//head/title');
	//item.title = ZU.xpathText(doc, '//meta[@property="og:title"]/@content');
	Z.debug(item.title);
	
	//var authors = ZU.xpathText(doc, '//div[@class="text-track-v1 author-info f14"]/div/span');
	//如果此位置的格式是 作者： XX，那么author = 作者，否则不解析。
	//authors=authors.replace("作者：", "");
	//Z.debug(authors);
	//item.creators.push(ZU.cleanAuthor((authors), "author"));
	item.language='zh-CN';
	item.url=url;
	item.abstractNote = ZU.xpathText(doc, '//meta[@name="Description"]/@content');
	Z.debug(item.abstractNote);
	item.publicationTitle = "观察者网";
	//item.CN = "44-0003";

	//var publicationDate = ZU.xpathText(doc, '//div[@class="text-track-v1 author-info f14"]/div[@class="mgt10"]/span');
	//Z.debug(publicationDate);
	//var publicationDate=doc.body.getElementsByClassName('nfzm-content__publish')[0].getAttribute('data-time');
	//if (publicationDate) {
	//	item.date = ZU.strToISO(publicationDate);
	//}
	
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
