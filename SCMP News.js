{
	"translatorID": "12f7e600-851b-41f4-8306-dec9f08a0356",
	"label": "SCMP News",
	"creator": "pixiandouban",
	"target": "^https://www.scmp.com",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-11-25 06:55:06"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2021 Philipp Zumstein, pixiandouban
	
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

//reference NYTimes.com.js https://github.com/zotero/translators/blob/master/NYTimes.com.js

function detectWeb(doc, url) {
	// we use another function name to avoid confusions with the
	// same function from the called EM translator (sigh)
	return detectWebHere(doc, url);
}


function detectWebHere(doc, url) {
	if (url.includes('/search') && getSearchResults(doc, true)) {
		return "multiple";
	}
	if (ZU.xpathText(doc, '//meta[@property="og:type" and @content="article"]/@content')) {
		if (url.includes('article')) {
			return "newspaperArticle";
		}
	}
	return false;
}

//SCMP News Search interface
function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	var rows = doc.querySelectorAll('li[class="search-results__item item"]'); //an attribute selector
	//Z.debug(rows);
	for (var i = 0; i < rows.length; i++) {
		var href = ZU.xpathText(rows[i], '(.//a)[1]/@href');
		var title = ZU.xpathText(rows[i], './/span[@class="content-link__title"]');
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
	else {
		scrape(doc, url);
	}
}

function scrape(doc, url) {
	var type = detectWebHere(doc, url);
	var translator = Zotero.loadTranslator('web');
	// Embedded Metadata
	translator.setTranslator('951c027d-74ac-47d4-a107-9c3069ab7b48');
	// translator.setDocument(doc);
	
	translator.setHandler('itemDone', function (obj, item) {
		item.itemType = type;
		item.language = "en";
		if (item.date) {
			item.date = ZU.strToISO(item.date);
		}
		else {
			item.date = attr(doc, 'time[datetime]', 'datetime')
				|| attr(doc, 'meta[itemprop="datePublished"]', 'content')
				|| attr(doc, 'meta[itemprop="dateModified"]', 'content');
		}

		item.publicationTitle = "South China Morning Post";
		item.ISSN = "1072-6731";
		
		// Multiple authors are (sometimes) just put into the same Metadata field
		var authors = attr(doc, 'meta[name="cse_author"]', 'content') || attr(doc, 'meta[name="author"]', 'content') || attr(doc, 'meta[name="byl"]', 'content') || text(doc, '*[class^="Byline-bylineAuthor--"]');
		if (authors && item.creators.length <= 1) {
			authors = authors.replace(/^By /, '');
			if (authors == authors.toUpperCase()) { // convert to title case if all caps
				authors = ZU.capitalizeTitle(authors, true);
			}
			item.creators = [];
			var authorsList = authors.split(/,|\band\b/);
			for (let i = 0; i < authorsList.length; i++) {
				item.creators.push(ZU.cleanAuthor(authorsList[i], "author"));
			}
		}
		item.url = ZU.xpathText(doc, '//link[@rel="canonical"]/@href') || url;
		if (item.url && item.url.substr(0, 2) == "//") {
			item.url = "https:" + item.url;
		}
		item.libraryCatalog = "SCMP News";
		// Convert all caps title of NYT archive pages to title case
		if (item.title == item.title.toUpperCase()) {
			item.title = ZU.capitalizeTitle(item.title, true);
		}
		// Strip "(Published [YEAR])" from old articles
		item.title = item.title.replace(/\s+\(Published \d{4}\)$/, '');
		// Only force all caps to title case when all tags are all caps
		var allcaps = true;
		for (let i = 0; i < item.tags.length; i++) {
			if (item.tags[i] != item.tags[i].toUpperCase()) {
				allcaps = false;
				break;
			}
		}
		if (allcaps) {
			for (let i = 0; i < item.tags.length; i++) {
				item.tags[i] = ZU.capitalizeTitle(item.tags[i], true);
			}
		}

		/* TODO: Fix saving the PDF attachment which is currently broken
		
		// PDF attachments are in subURL with key & signature
		var pdfurl = ZU.xpathText(doc, '//div[@id="articleAccess"]//span[@class="downloadPDF"]/a[contains(@href, "/pdf")]/@href | //a[@class="button download-pdf-button"]/@href');
		if (pdfurl) {
			ZU.processDocuments(pdfurl,
				function(pdfDoc) {
					authenticatedPDFURL = pdfDoc.getElementById('archivePDF').src;
					if (authenticatedPDFURL) {
						item.attachments.push({
							title: "NYTimes Archive PDF",
							mimeType: 'application/pdf',
							url: authenticatedPDFURL
						});
					} else {
						Z.debug("Could not find authenticated PDF URL");
						item.complete();
					}
				},
				function() {
					Z.debug("PDF retrieved: "+authenticatedPDFURL);
					item.complete();
				}
			);
		} else {
		*/
		Z.debug("Not attempting PDF retrieval");
		item.complete();
		// }
	});
	
	translator.getTranslatorObject(function (trans) {
		trans.splitTags = false;
		trans.addCustomFields({
			dat: 'date',
		});
		trans.doWeb(doc, url);
	});
}


/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.scmp.com/news/hong-kong/health-environment/article/3157272/coronavirus-hong-kong-has-not-done-enough-fight?module=live&pgtype=homepage",
		"items": [
			{
				"itemType": "newspaperArticle",
				"title": "Coronavirus: Hong Kong has not done enough to fight the next infection wave, health chief says, pointing to adoption of tracking technology",
				"creators": [
					{
						"firstName": "Elizabeth",
						"lastName": "Cheung",
						"creatorType": "author"
					}
				],
				"date": "2021-11-24",
				"ISSN": "1021-6731",
				"abstractNote": "The university has found Marc Hauser “solely responsible” for eight instances of scientific misconduct.",
				"language": "en",
				"libraryCatalog": "SCMP News",
				"publicationTitle": "South China Morning Post",
				"section": "Health & Environment",
				"url": "https://www.scmp.com/news/hong-kong/health-environment/article/3157272/coronavirus-hong-kong-has-not-done-enough-fight",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
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
		"url": "https://www.scmp.com/search/vaccine",
		"items": "multiple"
	}
]
/** END TEST CASES **/
