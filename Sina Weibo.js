{
	"translatorID": "231208c0-1a69-4f58-b0f7-4a78e5e057a5",
	"label": "Sina Weibo",
	"creator": "pixiandouban",
	"target": "^https?://weibo\\.com/",
	"minVersion": "4.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "csibv",
	"lastUpdated": "2021-11-24 14:05:19"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Weibo Translator
	Copyright © 2020-2021 pixiandouban
	
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


let titleRe = /^(?:\(\d+\) )?(.+) .* Twitter: .([\S\s]+). \/ Twitter/;

function detectWeb(doc, url) {
	if (url.includes('q=') || url.includes('newlogin')) {
		return "multiple";
	}
	else{
		return "blogPost";		
	}
}

function unshortenURLs(doc, str) {
	var matches = str.match(/https?:\/\/t\.co\/[a-z0-9]+/gi);
	if (matches) {
		for (let match of matches) {
			let url = unshortenURL(doc, match);
			// Replace t.co URLs (with optional query string, such as "?amp=1")
			// in text with real URLs
			str = str.replace(new RegExp(ZU.quotemeta(match) + '(\\?\\w+)?'), url);
		}
	}
	return str;
}

function unshortenURL(doc, tCoURL) {
	var a = doc.querySelector('a[href*="' + tCoURL + '"]');
	return (a ? a.textContent.replace(/…$/, '') : false) || tCoURL;
}

function extractURLs(doc, str) {
	var urls = [];
	var matches = str.match(/https?:\/\/t\.co\/[a-z0-9]+/gi);
	if (matches) {
		for (let match of matches) {
			urls.push(unshortenURL(doc, match));
		}
	}
	return urls;
}

// Find the link to the permalink (e.g., "8h")
function findPermalinkLink(doc, canonicalURL) {
	let path = canonicalURL.match(/https?:\/\/[^/]+(.+)/)[1];
	return doc.querySelector(`a[href="${path}" i]`);
}

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		//Zotero.selectItems(getSearchResults(doc, false), function (items) {
		//	if (items) ZU.processDocuments(Object.keys(items), scrape);
		//});
	}
	else {
		scrape(doc, url);
	}
}

function scrape(doc, url) {
	var item = new Zotero.Item("blogPost");

	// Title is tweet with newlines removed
	var tt = ZU.xpathText(doc, '//head/title')
	          ZU.xpathText(doc, '//div[@class="detail_wbtext_4CRf9 yawf-feed-detail-content yawf-feed-detail-content-handler"]');
	Z.debug(tt);
	item.title = tt;
	
	// Don't set short title when tweet contains colon
	item.shortTitle = false;
	
	item.language = 'zh-CN';
	
	/*		
	item.creators.push({
		lastName: author,
		fieldMode: 1,
		creatorType: 'author'
	});
	*/
	// Date and time

	//Old Weibo UI && New Weibo UI
	item.blogTitle = ZU.xpathText(doc, '//div[@class="WB_detail"]/div[@class="WB_info"]/a[@class="W_f14 W_fb S_txt1"]')
						|| ZU.xpathText(doc, '//a[@class="ALink_default_2ibt1 head_cut_2Zcft head_name_24eEB yawf-feed-author"]');
	item.websiteType = "Weibo";
	item.url = url;
	
	/*
	// Add retweets and likes to Extra
	let retweets;
	let likes;
	let str = text(articleEl, 'a[href*="retweets"]');
	*/
	
	item.attachments.push({
		document: doc,
		title: "Snapshot"
	});
	
	/*
	// Add links to any URLs
	*/
	
	item.complete();
}


/** BEGIN TEST CASES **/
// Please test with Chrome/Edge, there're problems with Firefox without logging in Sina Weibo.
var testCases = [
	{
		"type": "web",
		"url": "https://weibo.com/5044281310/L2XFvAwji",
		"defer": true,
		"items": [
			{
				"itemType": "blogPost",
				"title": "【用时40小时，云南#哀牢山4名遇难人员遗体转运至殡仪馆# 】11月24日零时左右，4名失联人员由中国地质调查局昆明自然资源综合调查中心运送至镇沅县殡仪馆。此时距4名失联人员被发现并开始转运，已40小时。",
				"creators": [
					{
						"lastName": "澎湃新闻",
						"fieldMode": 1,
						"creatorType": "author"
					}
				],
				"date": "2021-11-24",
				"blogTitle": "澎湃新闻",
				"language": "zh-CN",
				"url": "https://weibo.com/5044281310/L2XFvAwji",
				"websiteType": "Weibo",
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
