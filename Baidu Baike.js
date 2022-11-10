{
	"translatorID": "867474da-38d5-48eb-90cf-64e90aeb04d3",
	"label": "Baidu Baike",
	"creator": "pixiandouban",
	"target": "^https?://baike.baidu.(com|hk)",
	"minVersion": "2.1.9",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-11-10 08:06:45"
}

/**
	Copyright (c) 2021 pixiandouban
	
	This program is free software: you can redistribute it and/or
	modify it under the terms of the GNU Affero General Public License
	as published by the Free Software Foundation, either version 3 of
	the License, or (at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	Affero General Public License for more details.
	
	You should have received a copy of the GNU Affero General Public
	License along with this program. If not, see
	<http://www.gnu.org/licenses/>.
*/

function detectWeb(doc, url) {
	if(url.includes('search') || url.includes('word=')){
		if(url.includes('lemma_search-box') || url.includes ('search-result_lemma')){ //exclude synonym
			return "encyclopediaArticle"
		}
		else {
			return "multiple";
		}
	}
	else if(url.includes('historylist') || url.includes('tashuo') || url.includes('planet')) //exclude non-lemma-item 排除 他说/星球/历史列表
	{
		return false;
	}
	else{
		return "encyclopediaArticle";
	}
	
}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	var rows = doc.querySelectorAll('a[class="result-title J-result-title"]');
	for (let row of rows) {
		let href = row.href;
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
			if (items) ZU.processDocuments(Object.keys(items), scrape);
		});
	}
	else {
		scrape(doc, url);
	}
}

function scrape(doc, url) {
	var item = new Zotero.Item('encyclopediaArticle');
	//item.title = ZU.trimInternal((doc.getElementById('firstHeading') || doc.getElementById('section_0')).textContent);

	/*
	pattern = /_百度百科/;
	item.title = Zotero.Utilities.trim(
		ZU.xpathText(doc, '//meta[@property="og:title"]/@content'), pattern
	);
	*/

	item.title = ZU.xpathText(doc, '//meta[@property="og:title"]/@content').replace("_百度百科", "");
	Z.debug(item.title);

	item.date = ZU.xpathText(doc, '//meta[@itemprop="dateUpdate"]/@content');
	//Z.debug(update);

	item.abstractNote = ZU.xpathText(doc, '//meta[@property="og:description"]/@content');

	item.encyclopediaTitle = '百度百科';

	item.url = ZU.xpathText(doc,'//link[@rel="canonical"]/@href');
	item.language='zh-CN';	

	item.attachments.push({
		url: item.url,
		title: 'Snapshot',
		mimeType: 'text/html',
		snapshot: true
	});

	item.complete();	

}




/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://baike.baidu.com/item/%E6%9D%8E%E9%B8%BF%E7%AB%A0/28575",
		"items": [
			{
				"itemType": "encyclopediaArticle",
				"title": "李鸿章",
				"creators": [],
				"date": "2022-11-08 22:37:36",
				"abstractNote": [],
				"encyclopediaTitle": "百度百科",
				"extra": [],
				"language": "zh-CN",
				"libraryCatalog": "Baidu Baike",
				"rights": [],
				"url": "https://baike.baidu.com/item/%E6%9D%8E%E9%B8%BF%E7%AB%A0/28575",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html",
						"snapshot": true
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://baike.baidu.com/item/%E5%A4%A9%E6%B0%94/24449?fromModule=search-result_lemma",
		"items": [
			{
				"itemType": "encyclopediaArticle",
				"title": "天气",
				"creators": [],
				"date": "2022-08-21 11:13:33",
				"abstractNote": [],
				"encyclopediaTitle": "百度百科",
				"extra": [],
				"language": "zh-CN",
				"libraryCatalog": "Baidu Baike",
				"rights": "",
				"url": "https://baike.baidu.com/item/%E5%A4%A9%E6%B0%94/24449",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html",
						"snapshot": true
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://baike.baidu.com/search?word=%E5%A4%A9%E6%B0%94&pn=0&rn=0&enc=utf8",
		"items": "multiple"
	}
]
/** END TEST CASES **/
