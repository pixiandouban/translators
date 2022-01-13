{
	"translatorID": "fb5447d7-78e1-4c54-9afd-b076c1f8ebc0",
	"label": "163 News",
	"creator": "pixiandouban",
	"target": "^https?://www.163.com/(news|money|tech|ent)",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-01-13 19:57:14"
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
	if(ogType.content === "article")
	{
		return "blogPost";
	}
	else{
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
	
	var item = new Zotero.Item("blogPost");		
	var user = doc.body.querySelector("div.container.clearfix > div.post_main > div.post_info > a");
	var jubao = "举报";
	Z.debug("user: " + user.innerText);
	if(user.innerText !== jubao ){
		item.blogTitle = user.innerText;	
	}
	else{
		source = doc.body.querySelector("div.container.clearfix > div.post_main > div.post_info");
		sourceintext = source.innerText.match(/来源:.*/);
		sourceTitle = sourceintext.toString().replace("来源:", "");
		Z.debug("sourceTitle: " + sourceTitle);
		//Z.debug("source: "+ source.innerText);
		item.blogTitle = sourceTitle;			
	}

	//item.url=ZU.xpathText(doc, '//meta[@property="og:url"]/@content');
	if( user.innerText !== jubao){
		item.url=ZU.xpathText(doc, '//div[@class="post_info"]/a[1]/@href'); //original agency website		
	}
	else{
		item.url = ZU.xpathText(doc, '//meta[@property="og:url"]/@content'); //163 website	
	} 
	//item.url = doc.body.querySelector("div.post_info > a.href");
	Z.debug("url: " + item.url);	
	
	var articleTitle = ZU.xpathText(doc, '//meta[@property="og:title"]/@content');
	Z.debug("Title: "+articleTitle);
	item.title=articleTitle;

	var keywords = ZU.xpathText(doc, '//meta[@name="keywords"]/@content');
	var tags = keywords.split(/,/);
	for(let i = 0; i < tags.length; i++){
		item.tags[i] = tags[i];
	}
	Z.debug("tags: " + item.tags);

	item.language='zh-CN';
	
	item.abstractNote = ZU.xpathText(doc, '//meta[@property="og:description"]/@content');
	Z.debug("abstractNote: " +item.abstractNote);
	
	item.type = "blogPost";
	item.websiteType= '网易新闻';	


	var publicationDate = ZU.xpathText(doc, '//meta[@property="article:published_time"]/@content');
	if (publicationDate) {
		Z.debug("datetime: " + publicationDate);		
		item.date = ZU.strToISO(publicationDate);
	}
	
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
		"url": "https://www.163.com/news/article/GPGPIHSS0001899O.html",
		"items": [
			{
				"itemType": "blogPost",
				"language": "zh-CN",
				"title": "聂海胜、刘伯明、汤洪波分别被颁发航天功勋奖章",
				"date": "2021-11-23"
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.163.com/tech/article/GTKJ44M1000999LD.html",
		"items": [
			{
				"itemType": "blogPost",
				"language": "zh-CN",
				"title": "华为、李洪元事件民事判决书曝光：后者自愿离职，法院驳回其要求",
				"date": "2022-01-13"
			}
		]
	},	
	{
		"type": "web",
		"url": "https://www.163.com/ent/article/GTIUCSD100038FO9.html",
		"items": [
			{
				"itemType": "blogPost",
				"language": "zh-CN",
				"title": "《白雪公主》电影男主角选定 身份不是王子或猎人",
				"date": "2022-01-13"
			}
		]
	},		
]
/** END TEST CASES **/
