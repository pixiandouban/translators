{
	"translatorID": "c27d9e99-7e5d-4b87-9db2-cabec5d8d756",
	"label": "ScienceNet.cn News",
	"creator": "pixiandouban",
	"target": "^https?:\\/\\/news.sciencenet.cn",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-01-16 14:01:49"
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
	item.title = ZU.xpathText(doc, '//div[@class="head-line clearfix"]/h1/span[@class="title"]') 
	|| ZU.xpathText(doc, '//div[@id="article"]/h1[@id="title"]')
	|| ZU.xpathText(doc, '//div[@class="h-news"]/div[@class="h-title"]')
	|| ZU.xpathText(doc, '//div[@id="headerTitle"]/div[@id="articleTit"]/h1[@id="title"]')
	|| ZU.xpathText(doc, '//div[@class="header"]/div[@class="h-p3 clearfix"]/div[@class="h-news"]/div[@class="h-title"]');  //m.xinhuanet.com
	//item.title = ZU.xpathText(doc, '//div[@id="article"]/h1[@id="title"]');	
	Z.debug("title: "+item.title);
	//var authors=ZU.xpathText(doc, '//meta[@name="author"]/@content');
	//item.creators.push(ZU.cleanAuthor((authors), "author"));
	item.language='zh-hans';
	item.url=url;
	
	var keywords = ZU.xpathText(doc, '//meta[@name="keywords"]/@content');
	var tags = keywords.trim().split(/,/);
	for(let i = 0; i < tags.length; i++){
		item.tags[i] = tags[i];
	}
	Z.debug("tags: " + item.tags);	
	
	item.abstractNote = ZU.xpathText(doc, '//meta[@name="description"]/@content');
	Z.debug("abstractNote: "+item.abstractNote);
	//item.CN = "44-0003";


	var publicationYear = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="year"]/em');
	var publicationDay = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="day"]') ;
	var publicationTime = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="time"]');
	var publicationDate = publicationYear + '/' + publicationDay + ' ' + publicationTime;
	//var publicationDate = ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="year"]/em') +'/' +ZU.xpathText(doc, '//div[@class="header-time left"]/span[@class="day"]') ;
	//var publicationDate = ZU.xpathText(doc, '//meta[@itemprop="datePublished"]/@content')
	//var publicationDate=doc.body.getElementsByClassName('nfzm-content__publish')[0].getAttribute('data-time');
	//Z.debug("publicationDate: " + publicationDate);
	if (publicationYear) {
		item.date = ZU.strToISO(publicationDate); //www.news.cn|www.xinhuanet.com
		Z.debug("item.date : " + item.date);		
	}
	else{
		item.date =  ZU.strToISO(ZU.xpathText(doc, '//div[@class="h-news"]/div[@class="h-info"]/span[@class="h-time"]')) //m.xinhuanet.com
				|| ZU.strToISO(ZU.xpathText(doc, '//div[@class="source"]/span[@class="time"]')); //local channel; js|ah|sh....news.cn
		Z.debug("item.date : " + item.date);		
	}

	var authors;
	var source = ZU.xpathText(doc, '//meta[@name="source"]/@content') //Xinhua News Agency
			  || ZU.xpathText(doc, '//div[@class="source"]/span/em[@id="source"]') //reprinted news from other agency
			  || ZU.xpathText(doc, '//div[@id="news_title"]/div[@class="source"]/span[@class="sourceText"]') //xx.xinhuanet.com			  			  
			  || ZU.xpathText(doc, '//div[@class="header-cont clearfix"]/div[@class="source"]').replace(/来源：/,"")			  
			  || ZU.xpathText(doc, '//div[@class="h-p3 clearfix"]/div[@class="source"]').trim().replace(/来源：/,""); //reprinted news from other agency

	//var source = ZU.xpathText(doc, '//div[@class="source"]/span/em[@id="source"]');
	//var source = ZU.xpathText(doc, '//div[@class="h-p3 clearfix"]/div[@class="source"]');//.trim().replace(/来源：/,""); //reprinted news from other agency	
	Z.debug("source: "+ source);
	if(source){
		item.publicationTitle = source;		
	}
	else{
	item.publicationTitle = "新华网";				
	}
	var website = "新华网";
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
	},
	{
		"type": "web",
		"url": "http://www.xinhuanet.com/tech/20220113/b35605fa7825417b88f1c970e9c8a74b/c.html",
		"items": [
			{
				"itemType": "newspaperArticle",
				"title": "市场主体创新活力得到激发",
				"date": "2021-11-22",				
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
