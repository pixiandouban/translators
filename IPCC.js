{
	"translatorID": "c6efb3a8-a6c9-4ff2-b1c5-27fb4b5b2935",
	"label": "IPCC",
	"creator": "Abe Jellinek",
	"target": "^https?://www\\.ipcc\\.ch/report/",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2022-06-30 13:32:56"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2021 Abe Jellinek
	
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

let report6Wg1Editors = 'Valérie Masson-Delmotte; Panmao Zhai; Anna Pirani; Sarah L. Connors; C. Péan; Sophie Berger; Nada Caud; Y. Chen; Leah Goldfarb; Melissa I. Gomis; Mengtian Huang; Katherine Leitzell; Elisabeth Lonnoy; J. B. Robin Matthews; Thomas K. Maycock; Tim Waterfield; Özge Yelekçi; R. Yu; Botao Zhou'
	.split('; ').map(name => ZU.cleanAuthor(name, 'editor', name.includes(', ')));

let report6Wg1TechSummaryAuthors = 'Paola A. Arias; Nicolas Bellouin; Erika Coppola; Richard G. Jones; Gerhard Krinner; Jochem Marotzke; Vaishali Naik; Matthew D. Palmer; Gian-Kasper Plattner; Joeri Rogelj; Maisa Rojas; Jana Sillmann; Trude Storelvmo; Peter W. Thorne; Blair Trewin; Krishna M. Achutarao; Bhupesh Adhikary; Richard P. Allan; Kyle Armour; Govindasamy Bala; Rondrotiana Barimalala; Sophie Berger; Josep G. Canadell; Christophe Cassou; Annalisa Cherchi; William Collins; William D. Collins; Sarah L. Connors; Susanna Corti; Faye A. Cruz; Frank J. Dentener; Claudine Dereczynski; Di Luca, Alejandro; Aïda Diongue-Niang; Francisco J. Doblas-Reyes; Alessandro Dosio; Hervé Douville; François Engelbrecht; Veronika Eyring; Erich Fischer; Piers Forster; Baylor Fox-Kemper; Jan S. Fuglestvedt; John C. Fyfe; Nathan P. Gillett; Leah Goldfarb; Irina V. Gorodetskaya; José Manuel Gutiérrez; Rafiq Hamdi; Ed Hawkins; Helene T. Hewitt; Pandora Hope; Akm Saiful Islam; Christopher Jones; Darrell S. Kaufman; Robert E. Kopp; Yu Kosaka; James Kossin; Svitlana Krakovska; June-Yi Lee; Jian Li; Thorsten Mauritsen; Thomas K. Maycock; Malte Meinshausen; Seung-Ki Min; Scheel Monteiro, Pedro; Thanh Ngo-Duc; Friederike Otto; Izidine Pinto; Anna Pirani; Krishnan Raghavan; Roshanka Ranasinghe; Alex C. Ruane; Lucas Ruiz; Jean-Baptiste Sallée; Bjørn H. Samset; Shubha Sathyendranath; Sonia I. Seneviratne; Anna A. Sörensson; Sophie Szopa; Izuru Takayabu; Anne-Marie Treguier; Bart van den Hurk; Robert Vautard; von Schuckmann, Karina; Sönke Zaehle; Xuebin Zhang; Kirsten Zickfeld'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch1Authors = 'Deliang Chen; Maisa Rojas; Bjørn H. Samset; Kim Cobb; Aïda Diongue-Niang; Paul Edwards; Seita Emori; Sergio Henrique Faria; Ed Hawkins; Pandora Hope; Philippe Huybrechts; Malte Meinshausen; Sawsan K. Mustafa; Gian-Kasper Plattner; Anne Marie Tréguier'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch2Authors = 'Sergey K. Gulev; Peter W. Thorne; Jinho Ahn; Frank J. Dentener; Catia M. Domingues; Sebastian Gerland; Daoyi Gong; Darrell S. Kaufman; Hyacinth C. Nnamchi; Johannes Quaas; Juan Antonio Rivera; Shubha Sathyendranath; Sharon L. Smith; Blair Trewin; von Shuckmann, Karina; Russell S. Vose'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch3Authors = 'Veronika Eyring; Nathan P. Gillett; Krishna M. Achutarao; Rondrotiana Barimalala; Barreiro Parrillo, Marcelo; Nicolas Bellouin; Christophe Cassou; Paul J. Durack; Yu Kosaka; Shayne McGregor; Seung-Ki Min; Olaf Morgenstern; Ying Sun'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch4Authors = 'June-Yi Lee; Jochem Marotzke; Govindasamy Bala; Long Cao; Susanna Corti; John P. Dunne; François Engelbrecht; Erich Fischer; John C. Fyfe; Christopher Jones; Amanda Maycock; Joseph Mutemi; Ousman Ndiaye; Swapna Panickal; Tianjun Zhou'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch5Authors = 'Josep G. Canadell; Scheel Monteiro, Pedro; Marcos H. Costa; Cotrim da Cunha, Leticia; Peter M. Cox; Alexey V. Eliseev; Stephanie Henson; Masao Ishii; Samuel Jaccard; Charles Koven; Annalea Lohila; Prabir K. Patra; Shilong Piao; Joeri Rogelj; Stephen Syampungani; Sönke Zaehle; Kirsten Zickfeld'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch6Authors = 'Vaishali Naik; Sophie Szopa; Bhupesh Adhikary; Artaxo Netto, Paulo Eduardo; Terje Berntsen; William D. Collins; Sandro Fuzzi; Laura Gallardo; Astrid Kiendler-Scharr; Zbigniew Klimont; Hong Liao; Nadine Unger; Prodromos Zanis'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch7Authors = 'Piers Forster; Trude Storelvmo; Kyle Armour; William Collins; Jean-Luis Dufresne; David Frame; Daniel J. Lunt; Thorsten Mauritsen; Matthew D. Palmer; Masahiro Watanabe; Martin Wild; Xuebin Zhang'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch8Authors = 'Hervé Douville; Krishnan Raghavan; James A. Renwick; Richard P. Allan; Paola A. Arias; M. Barlow; Cerezo Mota, Ruth; Annalisa Cherchi; Thian Yew Gan; Joelle Gergis; Dabang Jiang; Asif Khan; Pokam Mba, Wilfried; Daniel Rosenfeld; Jessica Tierney; Olga Zolina'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch9Authors = 'Baylor Fox-Kemper; Helene T. Hewitt; Cunde Xiao; Guðfinna Aðalgeirsdóttir; Sybren S. Drijfhout; Tamsin L. Edwards; Nicholas R. Golledge; Mark Hemer; Robert E. Kopp; Gerhard Krinner; Alan Mix; Dirk Notz; Sophie Nowicki; Intan S. Nurhati; Lucas Ruiz; Jean-Baptiste Sallée; Aimée B. A. Slangen; Yongqiang Yu'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch10Authors = 'Francisco J. Doblas-Reyes; Anna A. Sörensson; M. Almazroui; Alessandro Dosio; William J. Gutowski; Rein Haarsma; Rafiq Hamdi; Bruce Hewitson; Won-Tae Kwon; Benjamin L. Lamptey; Douglas Maraun; Tannecia S. Stephenson; Izuru Takayabu; Laurent Terray; Andrew Turner; Zhiyan Zuo'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch11Authors = 'Sonia I. Seneviratne; Xuebin Zhang; M. Adnan; W. Badi; Claudine Dereczynski; Di Luca, Alejandro; S. Ghosh; Iskhaq Iskandar; James Kossin; Sophie Lewis; Friederike Otto; Izidine Pinto; Masaki Satoh; Sergio M. Vicente-Serrano; Michael Wehner; Botao Zhou'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1Ch12Authors = 'Roshanka Ranasinghe; Alex C. Ruane; Robert Vautard; Nigel Arnell; Erika Coppola; Faye A. Cruz; Suraje Dessai; Akm Saiful Islam; Mohammad Rahimi; Ruiz Carrascal, Daniel; Jana Sillmann; Mouhamadou Bamba Sylla; Claudia Tebaldi; Wen Wang; Rashyd Zaaboul'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg1AtlasAuthors = 'José Manuel Gutiérrez; Richard G. Jones; Gemma Teresa Narisma; Muniz Alves, Lincoln; Muhammad Amjad; Irina V. Gorodetskaya; Michael Grose; Nana Ama Browne Klutse; Svitlana Krakovska; Jian Li; Daniel Martínez-Castro; Linda O. Mearns; Sebastian H. Mernild; Thanh Ngo-Duc; van den Hurk, Bart; Jin-Ho Yoon'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));


let report6Wg2Editors = 'Hans-Otto Pörtner; Debra Cynthia Roberts; Melinda M.B. Tignor; Elvira S. Poloczanska; Katja Mintenbeck; Andrès Alegría; Marlies Craig; Stefanie Langsdorf; Sina Löschke; Vincent Möller; Andrew Okem; Bardhyl Rama'
	.split('; ').map(name => ZU.cleanAuthor(name, 'editor', name.includes(', ')));

let report6Wg2TechSummaryAuthors = 'Hans-Otto Pörtner; Debra Cynthia Roberts; Helen Adams; Ibidun Adelekan; Carolina Adler; Rita Adrian; Paulina Aldunce; Elham Ali; Rawshan Ara Begum; Birgit Bednar-Friedl; Bezner Kerr, Rachel; Robbert Biesbroek; Joern Birkmann; Kathryn Bowen; Martina Angela Caretta; Jofre Carnicer; Edwin Castellanos; Tae Sung Cheong; Winston Chow; Gueladio Cissé; Susan Clayton; Andrew Constable; Sarah Cooley; Mark John Costello; Marlies Craig; Wolfgang Cramer; Richard Dawson; David Dodman; Jackson Efitre; Matthias Garschagen; Elisabeth Gilmore; Bruce Glavovic; David Gutzler; Marjolin Haasnoot; Sherilee Harper; Toshihiro Hasegawa; Bronwyn Hayward; Jeffrey A. Hicke; Yukihiko Hirabayashi; Cunrui Huang; Kanungwe Kalaba; Wolfgang Kiessling; Akio Kitoh; Rodel Lasco; Judy Lawrence; Maria Fernanda Lemos; Robert Lempert; Christopher Lennard; Deborah Ley; Tabea Lissner; Qiyong Liu; Emma Liwenga; Salvador Lluch-Cota; Sina Löschke; Simone Lucatello; Yong Luo; Brendan Mackey; Katja Mintenbeck; Alisher Mirzabaev; Vincent Möller; Mariana Moncassim Vale; Mike D. Morecroft; Linda Mortsch; Aditi Mukherji; Tero Mustonen; Michelle Mycoo; Johanna Nalau; Mark New; Andrew Okem; Jean Pierre Ometto; Brian O’Neill; Rajiv Pandey; Camille Parmesan; Mark Pelling; Patricia Fernanda Pinho; John Pinnegar; Elvira S. Poloczanska; Anjal Prakash; Benjamin Preston; Marie-Fanny Racault; Diana Reckien; Aromar Revi; Steven K. Rose; E. Lisa F. Schipper; Daniela N. Schmidt; David Schoeman; Rajib Shaw; Nicholas P. Simpson; Chandni Singh; William Solecki; Lindsay Stringer; Edmond Totin; Christopher Trisos; Yongyut Trisurat; Maarten van Aalst; David Viner; Morgan Wairu; Rachel Warren; Philippus Wester; David Wrathall; Zelina Zaiton Ibrahim'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch1Authors = 'Rawshan Ara Begum; Robert Lempert; Elham Ali; Tor Arve Benjaminsen; Thomas Bernauer; Wolfgang Cramer; Xuefeng Cui; Katharine Mach; Gustavo Nagy; Nils Christian Stenseth: Raman Sukumar; Philippus Wester'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch2Authors = 'Camille Parmesan; Mike D. Morecroft; Yongyut Trisurat; Rita Adrian; Gusti Zakaria Anshari; Almut Arneth; Qingzhu Gao; Patrick Gonzalez; Rebecca Harris; Jeff Price; Nicola Stevens; Gautam Hirak Talukdar'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch3Authors = 'Sarah Cooley; David Schoeman; Laurent Bopp; Philip Boyd; Simon Donner; Shin-Ichi Ito; Wolfgang Kiessling; Paulina Martinetto; Elena Ojea; Marie-Fanny Racault; Björn Rost; Mette Skern-Mauritzen; Dawit Yemane Ghebrehiwet'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch4Authors = 'Martina Angela Caretta; Aditi Mukherji; Md Arfanuzzaman; Richard A. Betts; Alexander Gelfan; Yukiko Hirabayashi; Tabea Katharina Lissner; Lopez Gunn, Elena; Junguo Liu; Ruth Morgan; Sixbert Mwanga; Seree Supratid'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch5Authors = 'Bezner Kerr, Rachel; Toshihiro Hasegawa; Rodel Lasco; Indra Bhatt; Delphine Deryng; Aidan Farrell; Helen Gurney-Smith; Hui Ju; Salvador Lluch-Cota; Francisco Meza; Gerald Nelson; Henry Neufeldt; Philip Thornton'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch6Authors = 'David Dodman; Bronwyn Hayward; Mark Pelling; Vanesa Castán Broto; Winston Chow; Eric Chu; Richard Dawson; Luna Khirfan; Timon McPhearson; Anjal Prakash; Yan Zheng; Gina Ziervogel'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch7Authors = 'Guéladio Cissé; Robert McLeman; Helen Adams; Paulina Aldunce; Kathryn Bowen; Diarmid Campbell-Lendrum; Susan Clayton; Kristie L. Ebi; Jeremy Hess; Cunrui Huang; Qiyong Liu; Glenn McGregor; Jan Semenza; Maria Cristina Tirado'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch8Authors = 'Joern Birkmann; Emma Liwenga; Rajiv Pandey; Emily Boyd; Riyanti Djalante; François Gemenne; Walter Leal Filho; Patricia Fernanda Pinho; Lindsay Stringer; David Wrathall'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch9Authors = 'Christopher H. Trisos; Ibidun O. Adelekan; Edmond Totin; Ayansina Ayanlade; Jackson Efitre; Adugna Gemeda; Kanungwe Kalaba; Christopher Lennard; Catherine Masao; Yunus Mgaya; Grace Ngaruiya; Daniel Olago; Nicholas P. Simpson; Sumaya Zakieldeen'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch10Authors = 'Rajib Shaw; Yong Luo; Tae Sung Cheong; Abdul Halim, Sharina; Sanjay Chaturvedi; Masahiro Hashizume; Gregory E. Insarov; Yoichi Ishikawa; Mostafa Jafari; Akio Kitoh; Juan Pulhin; Chandni Singh; Kripa Vasant; Zhibin Zhang'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch11Authors = 'Judy Lawrence; Brendan Mackey; Francis Chiew; Mark J. Costello; Kevin Hennessy; Nina Lansbury; Uday Bhaskar Nidumolu; Gretta Pecl; Lauren Rickards; Nigel Tapper; Alistair Woodward; Anita Wreford'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch12Authors = 'Edwin J. Castellanos; Maria Fernanda Lemos; Laura Astigarraga; Noemí Chacón; Nicolás Cuvi; Christian Huggel; Liliana Miranda; Mariana Moncassim Vale; Jean Pierre Ometto; Pablo L. Peri; Julio C. Postigo; Laura Ramajo; Lisandro Roco; Matilde Rusticucci'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch13Authors = 'Birgit Bednar-Friedl; Robbert Biesbroek; Daniela N. Schmidt; Peter Alexander ; Knut Yngve Børsheim; Jofre Carnicer; Elena Georgopoulou; Marjolijn Haasnoot; Le Cozannet, Gonéri; Piero Lionello; Oksana Lipka; Christian Möllmann; Veruska Muccione; Tero Mustonen; Dieter Piepenburg; Lorraine Whitmarsh'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch14Authors = 'Jeffrey A. Hicke; Simone Lucatello; Linda D. Mortsch; Jackie Dawson; Domínguez Aguilar, Mauricio; Carolyn A.F. Enquist; Elisabeth A. Gilmore; David S. Gutzler; Sherilee Harper; Kirstin Holsman; Elizabeth B. Jewett; Timothy A. Kohler; Kathleen Miller'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch15Authors = 'Michelle Mycoo; Morgan Wairiu; Donovan Campbell; Virginie Duvat; Yimnang Golbuu; Shobha Maharaj; Johanna Nalau; Patrick Nunn; John Pinnegar; Olivia Warrick'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch16Authors = 'Brian O\'Neill; van Aalst, Maarten; Zelina Zaiton Ibrahim; Berrang Ford, Lea; Suruchi Bhadwal; Halvard Buhaug; Delavane Diaz; Katja Frieler; Matthias Garschagen; Alexandre Magnan; Guy Midgley; Alisher Mirzabaev; Adelle Thomas; Rachel Warren'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch17Authors = 'Mark New; Diana Reckien; David Viner; Carolina Adler; So-Min Cheong; Cecilia Conde; Andrew Constable; Coughlan de Perez, Erin; Annamaria Lammel; Reinhard Mechler; Ben Orlove; William Solecki'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

let report6Wg2Ch18Authors = 'E. Lisa F. Schipper; Aromar Revi; Benjamin L. Preston; Edward. R. Carr; Siri H. Eriksen; Luis R. Fernández-Carril; Bruce Glavovic; Nathalie J.M. Hilmi; Debora Ley; Rupa Mukerji; M. Silvia Muylaert de Araujo; Rosa Perez; Steven K. Rose; Pramod K. Singh'
	.split('; ').map(name => ZU.cleanAuthor(name, 'author', name.includes(', ')));

function wg1Chapter(slug, itemTemplate) {
	return Object.assign(new Zotero.Item('bookSection'), itemTemplate, {
		bookTitle: 'Climate Change 2021: The Physical Science Basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change',
		publisher: 'Cambridge University Press',
		date: '2021',
		creators: [...(itemTemplate.creators || []), ...report6Wg1Editors],
		attachments: [
			{
				title: 'Full Text PDF',
				mimeType: 'application/pdf',
				url: `https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_${slug}.pdf`
			}
		]
	});
}

function wg2Chapter(slug, itemTemplate) {
	return Object.assign(new Zotero.Item('bookSection'), itemTemplate, {
		bookTitle: 'Climate Change 2022: Impacts, Adaptation and Vulnerability. Contribution of Working Group II to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change',
		publisher: 'Cambridge University Press',
		date: '2022',
		creators: [...(itemTemplate.creators || []), ...report6Wg2Editors],
		attachments: [
			{
				title: 'Full Text PDF',
				mimeType: 'application/pdf',
				url: `https://www.ipcc.ch/report/ar6/wg2/downloads/report/IPCC_AR6_WGII_${slug}.pdf`
			}
		]
	});
}

function addSupplementaryMaterial(chapters) {
	let supplementaryMaterials = {};
	
	for (let [label, item] of Object.entries(chapters)) {
		if (item.itemType != 'bookSection'
			|| /summary|annex/i.test(item.title)) continue;
		
		supplementaryMaterials[label + ' - Supplementary Material'] = Object.assign(new Zotero.Item('bookSection'), item, {
			title: item.title + ' - Supplementary Material',
			attachments: item.attachments.map(a => Object.assign({}, a, {
				url: a.url.replace('.pdf', '_Supplementary_Material.pdf')
			}))
		});
	}
	
	return Object.assign({}, chapters, supplementaryMaterials);
}

let citations = {
	'/report/ar6/wg1/': addSupplementaryMaterial({
		'Full Report': Object.assign(new Zotero.Item('book'), {
			// yes, it's a report, but it's published like a book
			title: 'Climate Change 2021: The Physical Science Basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change',
			abstractNote: 'The Working Group I contribution to the Sixth Assessment Report addresses the most up-to-date physical understanding of the climate system and climate change, bringing together the latest advances in climate science, and combining multiple lines of evidence from paleoclimate, observations, process understanding, and global and regional climate simulations.',
			publisher: 'Cambridge University Press',
			date: '2021',
			creators: report6Wg1Editors,
			attachments: [
				{
					title: 'Full Text PDF',
					mimeType: 'application/pdf',
					url: 'https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Full_Report.pdf'
				}
			]
		}),
		'Summary for Policymakers': wg1Chapter('SPM', {
			title: 'Summary for policymakers',
			abstractNote: 'The Summary for Policymakers (SPM) provides a high-level summary of the understanding of the current state of the climate, including how it is changing and the role of human influence, and the state of knowledge about possible climate futures, climate information relevant to regions and sectors, and limiting human-induced climate change.'
		}),
		'Technical Summary': wg1Chapter('TS', {
			title: 'Technical summary',
			abstractNote: 'The Technical Summary (TS) is designed to bridge between the comprehensive assessment of the Working Group I Chapters and its Summary for Policymakers (SPM). It is primarily built from the Executive Summaries of the individual chapters and atlas and provides a synthesis of key findings based on multiple lines of evidence.',
			creators: report6Wg1TechSummaryAuthors
		}),
		'Chapter 1: Framing, context, methods': wg1Chapter('Chapter_01', {
			title: 'Framing, context, and methods',
			creators: report6Wg1Ch1Authors
		}),
		'Chapter 2: Changing state of the climate system': wg1Chapter('Chapter_02', {
			title: 'Changing state of the climate system',
			creators: report6Wg1Ch2Authors
		}),
		'Chapter 3: Human influence on the climate system': wg1Chapter('Chapter_03', {
			title: 'Human influence on the climate system',
			creators: report6Wg1Ch3Authors
		}),
		'Chapter 4: Future global climate: scenario-based projections and near-term information': wg1Chapter('Chapter_04', {
			title: 'Future global climate: scenario-based projections and near-term information',
			creators: report6Wg1Ch4Authors
		}),
		'Chapter 5: Global carbon and other biogeochemical cycles and feedbacks': wg1Chapter('Chapter_05', {
			title: 'Global carbon and other biogeochemical cycles and feedbacks',
			creators: report6Wg1Ch5Authors
		}),
		'Chapter 6: Short-lived climate forcers': wg1Chapter('Chapter_06', {
			title: 'Short-lived climate forcers',
			creators: report6Wg1Ch6Authors
		}),
		'Chapter 7: The Earth\'s energy budget, climate feedbacks, and climate sensitivity': wg1Chapter('Chapter_07', {
			title: 'The Earth\'s energy budget, climate feedbacks, and climate sensitivity',
			creators: report6Wg1Ch7Authors
		}),
		'Chapter 8: Water cycle changes': wg1Chapter('Chapter_08', {
			title: 'Water cycle changes',
			creators: report6Wg1Ch8Authors
		}),
		'Chapter 9: Ocean, cryosphere, and sea level change': wg1Chapter('Chapter_09', {
			title: 'Ocean, cryosphere, and sea level change',
			creators: report6Wg1Ch9Authors
		}),
		'Chapter 10: Linking global to regional climate change': wg1Chapter('Chapter_10', {
			title: 'Linking global to regional climate change',
			creators: report6Wg1Ch10Authors
		}),
		'Chapter 11: Weather and climate extreme events in a changing climate': wg1Chapter('Chapter_11', {
			title: 'Weather and climate extreme events in a changing climate',
			creators: report6Wg1Ch11Authors
		}),
		'Chapter 12: Climate change information for regional impact and for risk assessment': wg1Chapter('Chapter_12', {
			title: 'Climate change information for regional impact and for risk assessment',
			creators: report6Wg1Ch12Authors
		}),
		Atlas: wg1Chapter('Atlas', {
			title: 'Atlas',
			creators: report6Wg1AtlasAuthors,
			url: 'https://interactive-atlas.ipcc.ch/'
		}),
		'Annex I Observational Products': wg1Chapter('Annex_I', {
			title: 'Annex I: Observational products',
			// the IPCC's recommended citations call annex authors "editors,"
			// but we'll call them authors so they show up before the section
			// in the citation, separately from the book editors
			creators: [ZU.cleanAuthor('Blair Trewin', 'author')]
		}),
		'Annex II Models': wg1Chapter('Annex_II', {
			title: 'Annex II: Models',
			creators: [
				ZU.cleanAuthor('José Manuel Gutiérrez', 'author'),
				ZU.cleanAuthor('Anne-Marie Treguier', 'author')
			]
		}),
		'Annex III Radiative Forcing': wg1Chapter('Annex_III', {
			title: 'Annex III: Tables of historical and projected well-mixed greenhouse gas mixing ratios and effective radiative forcing of all climate forcers',
			creators: [
				ZU.cleanAuthor('Frank J. Dentener', 'author'),
				ZU.cleanAuthor('B. Hall', 'author'),
				ZU.cleanAuthor('Chris Smith', 'author')
			]
		}),
		'Annex IV Modes of Variability': wg1Chapter('Annex_IV', {
			title: 'Annex IV: Modes of variability',
			creators: [
				ZU.cleanAuthor('Christophe Cassou', 'author'),
				ZU.cleanAuthor('Annalisa Cherchi', 'author'),
				ZU.cleanAuthor('Yu Kosaka', 'author')
			]
		}),
		'Annex V Monsoons': wg1Chapter('Annex_V', {
			title: 'Annex V: Monsoons',
			creators: [
				ZU.cleanAuthor('Annalisa Cherchi', 'author'),
				ZU.cleanAuthor('Andrew Turner', 'author')
			]
		}),
		'Annex VI Climatic Impact-Driver and Extreme Indices': wg1Chapter('Annex_VI', {
			title: 'Annex VI: Climatic impact-driver and extreme indices',
			creators: [
				ZU.cleanAuthor('José Manuel Gutiérrez', 'author'),
				ZU.cleanAuthor('Roshanka Ranasinghe', 'author'),
				ZU.cleanAuthor('Alex C. Ruane', 'author'),
				ZU.cleanAuthor('Robert Vautard', 'author')
			]
		}),
		'Annex VII Glossary': wg1Chapter('Annex_VII', {
			title: 'Annex VII: Glossary',
			creators: [
				ZU.cleanAuthor('J. B. Robin Matthews', 'author'),
				ZU.cleanAuthor('Jan S. Fuglestvedt', 'author'),
				ZU.cleanAuthor('Valérie Masson-Delmotte', 'author'),
				ZU.cleanAuthor('Vincent Möller', 'author'),
				ZU.cleanAuthor('Carlos Méndez', 'author'),
				ZU.cleanAuthor('van Diemen, Renée', 'author', true),
				ZU.cleanAuthor('Andy Reisinger', 'author'),
				ZU.cleanAuthor('Sergey Semenov', 'author')
			]
		})
	}),
	'/report/ar6/wg2/': addSupplementaryMaterial({
		'Full Report': Object.assign(new Zotero.Item('book'), {
			title: 'Climate Change 2022: Impacts, Adaptation and Vulnerability. Contribution of Working Group II to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change.',
			date: '2022',
			creators: report6Wg2Editors,
			attachments: [
				{
					title: 'Full Text PDF',
					mimeType: 'application/pdf',
					url: 'https://www.ipcc.ch/report/ar6/wg2/downloads/report/IPCC_AR6_WGII_FinalDraft_FullReport.pdf'
				}
			]
		}),
		'Summary for Policymakers': wg2Chapter('SummaryForPolicymakers', {
			title: 'Summary for policymakers',
			abstractNote: 'The Summary for Policymakers (SPM) provides a high-level summary of the key findings of the Working Group II Report and is approved by the IPCC member governments line by line.'
		}),
		'Technical Summary': wg2Chapter('TS', {
			title: 'Technical summary',
			abstractNote: 'The Technical Summary (TS) provides extended summary of key findings and serves as a link between the comprehensive assessment of the Working Group II Report and the concise SPM.',
			creators: report6Wg2TechSummaryAuthors
		}),
		'Chapter 1: Point of departure and key concepts': wg2Chapter('FinalDraft_Chapter01', {
			title: 'Point of departure and key concepts',
			creators: report6Wg2Ch1Authors
		}),
		'Chapter 2: Terrestrial and freshwater ecosystems and their services': wg2Chapter('FinalDraft_Chapter02', {
			title: 'Terrestrial and freshwater ecosystems and their services',
			creators: report6Wg2Ch2Authors
		}),
		'Chapter 3: Ocean and coastal ecosystems and their services': wg2Chapter('FinalDraft_Chapter03', {
			title: 'Ocean and coastal ecosystems and their services',
			creators: report6Wg2Ch3Authors
		}),
		'Chapter 4: Water': wg2Chapter('FinalDraft_Chapter04', {
			title: 'Water',
			creators: report6Wg2Ch4Authors
		}),
		'Chapter 5: Food, fibre, and other ecosystem products': wg2Chapter('FinalDraft_Chapter05', {
			title: 'Food, fibre, and other ecosystem products',
			creators: report6Wg2Ch5Authors
		}),
		'Chapter 6: Cities, settlements and key infrastructure': wg2Chapter('FinalDraft_Chapter06', {
			title: 'Cities, settlements and key infrastructure',
			creators: report6Wg2Ch6Authors
		}),
		'Chapter 7: Health, wellbeing and the changing structure of communities': wg2Chapter('FinalDraft_Chapter07', {
			title: 'Health, wellbeing and the changing structure of communities',
			creators: report6Wg2Ch7Authors
		}),
		'Chapter 8: Poverty, livelihoods and sustainable development': wg2Chapter('FinalDraft_Chapter08', {
			title: 'Poverty, livelihoods and sustainable development',
			creators: report6Wg2Ch8Authors
		}),
		'Chapter 9: Africa': wg2Chapter('FinalDraft_Chapter09', {
			title: 'Africa',
			creators: report6Wg2Ch9Authors
		}),
		'Chapter 10: Asia': wg2Chapter('FinalDraft_Chapter10', {
			title: 'Asia',
			creators: report6Wg2Ch10Authors
		}),
		'Chapter 11: Australasia': wg2Chapter('FinalDraft_Chapter11', {
			title: 'Australasia',
			creators: report6Wg2Ch11Authors
		}),
		'Chapter 12: Central and South America': wg2Chapter('FinalDraft_Chapter12', {
			title: 'Central and South America',
			creators: report6Wg2Ch12Authors
		}),
		'Chapter 13: Europe': wg2Chapter('FinalDraft_Chapter13', {
			title: 'Europe',
			creators: report6Wg2Ch13Authors
		}),
		'Chapter 14: North America': wg2Chapter('FinalDraft_Chapter14', {
			title: 'North America',
			creators: report6Wg2Ch14Authors
		}),
		'Chapter 15: Small Islands': wg2Chapter('FinalDraft_Chapter15', {
			title: 'Small Islands',
			creators: report6Wg2Ch15Authors
		}),
		'Chapter 16: Key risks across sectors and regions': wg2Chapter('FinalDraft_Chapter16', {
			title: 'Key risks across sectors and regions',
			creators: report6Wg2Ch16Authors
		}),
		'Chapter 17: Decision-making options for managing risk': wg2Chapter('FinalDraft_Chapter17', {
			title: 'Decision-making options for managing risk',
			creators: report6Wg2Ch17Authors
		}),
		'Chapter 18: Climate resilient development pathways': wg2Chapter('FinalDraft_Chapter18', {
			title: 'Climate resilient development pathways',
			creators: report6Wg2Ch18Authors
		})
	})
};

function getCitations(doc) {
	let pathname = doc.location.pathname;
	if (pathname == '/report/sixth-assessment-report-working-group-i/') {
		pathname = '/report/ar6/wg1/';
	}
	else if (pathname == '/report/sixth-assessment-report-working-group-ii/') {
		pathname = '/report/ar6/wg2/';
	}
	return citations[pathname];
}

function detectWeb(doc, _url) {
	if (getCitations(doc)) {
		return 'multiple';
	}
	return false;
}

function doWeb(doc, _url) {
	let chapters = getCitations(doc);
	Zotero.selectItems(chapters, function (items) {
		if (items) {
			for (let key of Object.keys(items)) {
				chapters[key].complete();
			}
		}
	});
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.ipcc.ch/report/ar6/wg1/",
		"items": "multiple"
	},
	{
		"type": "web",
		"url": "https://www.ipcc.ch/report/ar6/wg2/",
		"items": "multiple"
	}
]
/** END TEST CASES **/
