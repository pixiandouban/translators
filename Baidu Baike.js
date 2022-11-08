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
	"lastUpdated": "2022-06-22 05:04:48"
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
		return "multiple";
	}
	else{
		return "encyclopediaArticle";
	}
	
}

function getSearchResults(doc, checkOnly) {
	var items = {};
	var found = false;
	var rows = doc.querySelectorAll('.mw-search-result .mw-search-result-heading > a');
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
	item.title = ZU.trimInternal((doc.getElementById('firstHeading') || doc.getElementById('section_0')).textContent);
	
	/* Removing the creator and publisher. Wikipedia is pushing the creator in their own
  	directions on how to cite http://en.wikipedia.org/w/index.php?title=Special%3ACite&page=Psychology
  	but style guides - including Chicago and APA disagree and prefer just using titles.
  	cf. e.g. http://blog.apastyle.org/apastyle/2009/10/how-to-cite-wikipedia-in-apa-style.html
  	For Publisher, not even Wikipedia suggests citing the Foundation as a Publisher.

	item.creators.push({
		lastName: 'Wikipedia contributors',
		fieldMode: 1,
		creatorType: 'author'
	});

	item.publisher = 'Wikimedia Foundation, Inc.';
	*/
	//item.rights = 'Creative Commons Attribution-ShareAlike License';

	// turns out it's not that trivial to get the localized title for Wikipedia
	// we can try to strip it from the page title though
	// test for all sorts of dashes to account for different locales
	/** TODO: there's probably a better way to do this, since sometimes page
	 * title only says "- Wikipedia" (in some other language)
	 */

	item.encyclopediaTitle = '百度百科';

	item.url = url;

	item.attachments.push({
		url: item.url,
		title: 'Snapshot',
		mimeType: 'text/html',
		snapshot: true
	});

	item.language = doc.documentElement.lang;
	
	// last modified date is hard to get from the page because it is localized
	var pageInfoURL = '/w/api.php?action=query&format=json'
		+ '&inprop=url%7Cdisplaytitle'
		+ '&exintro=true&explaintext=true' // Intro section in plain text
		+ '&prop=info%7Cextracts'
		+ (revID // Different if we want a specific revision (this should be the general case)
			? '%7Crevisions&rvprop=timestamp&revids=' + encodeURIComponent(revID)
			: '&titles=' + encodeURIComponent(item.title)
		);

	/*	
	ZU.doGet(pageInfoURL, function (text) {
		var retObj = JSON.parse(text);
		if (retObj && !retObj.query.pages['-1']) {
			var pages = retObj.query.pages;
			for (var i in pages) {
				if (pages[i].revisions) {
					item.date = pages[i].revisions[0].timestamp;
				}
				else {
					item.date = pages[i].touched;
				}

				let displayTitle = pages[i].displaytitle
					.replace(/<em>/g, '<i>')
					.replace(/<\/em>/g, '</i>')
					.replace(/<strong>/, '<b>')
					.replace(/<\/strong>/, '</b>');

				// https://www.zotero.org/support/kb/rich_text_bibliography
				item.title = filterTagsInHTML(displayTitle,
					'i, b, sub, sup, '
					+ 'span[style="font-variant:small-caps;"], '
					+ 'span[class="nocase"]');
				
				// Note that this is the abstract for the latest revision,
				// not necessarily the revision that is being queried
				item.abstractNote = pages[i].extract;
				
				// we should never have more than one page returned,
				// but break just in case
				break;
			}
		}
		item.complete();
	});
	*/
}

function filterTagsInHTML(html, allowSelector) {
	let elem = new DOMParser().parseFromString(html, 'text/html');
	filterTags(elem.body, allowSelector);
	return elem.body.innerHTML;
}

function filterTags(root, allowSelector) {
	for (let node of root.childNodes) {
		if (!node.tagName) {
			continue;
		}

		if (node.matches(allowSelector)) {
			filterTags(node, allowSelector);
		}
		else {
			while (node.firstChild) {
				let firstChild = node.firstChild;
				node.parentNode.insertBefore(firstChild, node);
				filterTags(firstChild, allowSelector);
			}
			node.remove();
		}
	}
}



/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://baike.baidu.com/item/%E6%9D%8E%E9%B8%BF%E7%AB%A0/28575",
		"items": [
			{
				"itemType": "encyclopediaArticle",
				"title": "Zotero",
				"creators": [],
				"date": "2012-04-03T14:41:27Z",
				"abstractNote": "Zotero  is a free and open-source reference management software to manage bibliographic data and related research materials (such as PDF files). Notable features include web browser integration, online syncing, generation of in-text citations, footnotes, and bibliographies, as well as integration with the word processors Microsoft Word, LibreOffice Writer, and Google Docs. It is produced by the Center for History and New Media at George Mason University.",
				"encyclopediaTitle": "百度百科",
				"extra": "Page Version ID: 485342619",
				"language": "zh",
				"libraryCatalog": "Baidu Baike",
				"rights": "Creative Commons Attribution-ShareAlike License",
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
		"url": "https://en.m.wikipedia.org/w/index.php?title=1%25_rule_(Internet_culture)&oldid=999756024",
		"items": [
			{
				"itemType": "encyclopediaArticle",
				"title": "1% rule (Internet culture)",
				"creators": [],
				"date": "2021-01-11T20:19:42Z",
				"abstractNote": "In Internet culture, the 1% rule is a rule of thumb pertaining to participation in an internet community, stating that only 1% of the users of a website add content, while the other 99% of the participants only lurk. Variants include the 1–9–90 rule (sometimes 90–9–1 principle or the 89:10:1 ratio), which states that in a collaborative website such as a wiki, 90% of the participants of a community only consume content, 9% of the participants change or update content, and 1% of the participants add content. \nSimilar rules are known in information science; for instance, the 80/20 rule known as the Pareto principle states that 20 percent of a group will produce 80 percent of the activity, however the activity is defined.",
				"encyclopediaTitle": "Wikipedia",
				"extra": "Page Version ID: 999756024",
				"language": "en",
				"libraryCatalog": "Wikipedia",
				"rights": "Creative Commons Attribution-ShareAlike License",
				"url": "https://en.wikipedia.org/w/index.php?title=1%25_rule_(Internet_culture)&oldid=999756024",
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
