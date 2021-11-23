{
	"translatorID": "9adc085a-dd7b-4bfa-9098-0fc4f2451318",
	"label": "The Beijing News",
	"creator": "pixiandouban",
	"target": "https://www.bjnews.com.cn",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-23 17:04:22"
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
	if(url.includes('detail')){
		return "newspaperArticle";
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

	//item.title = ZU.xpathText(doc, '//head/title');
	var tt=ZU.xpathText(doc, '//div[@class="bodyTitle"]/div[@class="content"]/h1');
	//Z.debug(tt);
	item.title = tt;

	var authors=ZU.xpathText(doc, '//div[@class="bodyTitle"]//div[@class="fl left-info"]/span[@class="reporter"]/em');
	Z.debug(authors);
	var reporters = authors.replace(/[\s]+编辑.*$/, ""); //remove editors
	reporters = reporters.replace("记者：", "");
	reporters = reporters.split(/[\s]+/);
	if(reporters.length > 1){
		for( i=0; i < reporters.length; i=i+1){
			item.creators.push(ZU.cleanAuthor((reporters[i]), "author"));			
		}
	}
	else if(reporters.length === 1)
	{
		item.creators.push(ZU.cleanAuthor((reporters[0]), "author"));
	}	
	Z.debug(reporters);
	
	var editors = authors.replace(/^记者.*[\s]+编辑：/, "");
	Z.debug(editors);
	item.creators.push(ZU.cleanAuthor((editors), "reviewedAuthor"));
	Z.debug(item.creators);

	item.language='zh-hans';
	item.url=url;
	item.publicationTitle = "新京报";
	item.CN = "11-0245";
	item.place = "北京";

	item.abstractNote = ZU.xpathText(doc, '//div[@class="articleCenter"]/div[@class="introduction"]/p');
	//Z.debug(item.abstractNote);

	var publicationDate = ZU.xpathText(doc, '//div[@class="bodyTitle"]/div[@class="content"]//div[@class="fl left-info"]/span[@class="timer"]');
	//Z.debug(publicationDate);
	if (publicationDate) {
		item.date = ZU.strToISO(publicationDate);
	}
	//item.accessDate = new Date().toISOString().slice(0, 10); //Zotero will add accessDate automatically.

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
		"url": "https://www.bjnews.com.cn/news",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.bjnews.com.cn/search?bwsk=%E5%A4%A9%E6%B0%94",
		"items": "multiple"
	},	
	{
		"type": "web",
		"url": "https://www.bjnews.com.cn/detail/163755705314858.html",
		"items": [
			{
				"itemType": "newspaperArticle",
				"language": "zh-hans",
				"title": "哀牢山4名失联地质员已遇难 无人机热成像搜寻画面首曝光",
				"date": "2021-11-22"
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.bjnews.com.cn/detail/163748938114302.html",
		"items": [
			{
				"itemType": "newspaperArticle",
				"language": "zh-hans",				
				"title": "《吴清源》摄影师王昱追忆和田惠美：她的专业和严谨令人敬畏",
				"date": "2021-11-21"
			}
		]
	}
]
/** END TEST CASES **/
