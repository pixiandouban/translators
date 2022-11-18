{
	"translatorID": "6a540908-0419-4876-b2ae-0bcc50d99b4b",
	"label": "Encyclopedia of China 3rd",
	"creator": "pixiandouban",
	"target": "^https?://www.zgbk.com",
	"minVersion": "2.1.9",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-11-18 01:47:53"
}

/**
	Copyright (c) 2022 pixiandouban
	
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
	// TODO: adjust the logic here
	if(url.includes('search') || url.includes('q=') ){
		return "multiple";
	}
	else
	{
		return "encyclopediaArticle";
	}
}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	var rows = doc.querySelectorAll("h2.ellipsis.fl > a.font20.search-title");
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
	var item = new Zotero.Item("encyclopediaArticle");
	
	item.title = ZU.xpathText(doc, '//div[@class="title col-xs-12 clearfix"]/h2[@class="fl"]');
	Z.debug("title: "+item.title);	
		
	var update = ZU.xpathText(doc, '//div[@class="collectionbox clearfix "]/div[@class="fl time"]').replace(/最后更新 /,"")	; //最后更新日
	Z.debug("最后更新日 " + update);
	item.date = update;

	//const authors = doc.querySelectorAll("div#author-box > div.author.author-noshadow > span.n-author.mul-author > span.author-span > span");	
	const authorbox = doc.getElementById("author-box");
	const authors =authorbox.querySelectorAll("div.author.author-shadow > span.n-author > span.author-span.au-show > span");
	Z.debug("authors.length: " + authors.length);

	if(authors.length > 1){
		Z.debug("authors.length > 1");
		for( i=0; i < authors.length; i=i+1){
			item.creators.push(
				ZU.cleanAuthor(authors[i].textContent, "author", true)
			);
		}
	}
	else if(authors.length === 1)
	{
		ZU.cleanAuthor(authors[0].textContent, "author", true)
	}

	//Z.debug("item.creators :"+ item.creators);

	item.encyclopediaTitle = '中国大百科全书';
	item.edition = '第三版·网络版';
	item.publisher = '中国大百科全书出版社';	

	item.language = 'zh-CN';	

	item.url = url;

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
		"url": "https://www.zgbk.com/ecph/words?SiteID=1&ID=86468",
		"items": [
			{
				"itemType": "encyclopediaArticle",
				"title": "李白",
				"creators": [],
				"date": "2022-01-20",
				"edition": "第三版·网络版",
				"encyclopediaTitle": "中国大百科全书",
				"language": "zh-cn",
				"libraryCatalog": "Encyclopedia of China 3rd",
				"publisher": "中国大百科全书出版社",
				"url": "https://www.zgbk.com/ecph/words?SiteID=1&ID=86468",
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
		"url": "https://www.zgbk.com/ecph/search/result?SiteID=1&Alias=all&Query=%E5%AD%94%E5%AD%90",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.zgbk.com/ecph/words?SiteID=1&ID=86055",
		"items": [
			{
				"itemType": "encyclopediaArticle",
				"title": "章锡琛",
				"creators": [],
				"date": "2022-01-20",
				"edition": "第三版·网络版",
				"encyclopediaTitle": "中国大百科全书",
				"language": "zh-cn",
				"libraryCatalog": "Encyclopedia of China 3rd",
				"publisher": "中国大百科全书出版社",
				"url": "https://www.zgbk.com/ecph/words?SiteID=1&ID=86055",
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
	}
]
/** END TEST CASES **/
