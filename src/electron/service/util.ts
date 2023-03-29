import fs from 'fs';
import { resolve } from 'path';

import { getDocument } from 'pdfjs-dist';

async function getStr(data: Uint8Array) {
	let fullText = '';
	await getDocument(data).promise.then(
		async function (pdf) {
			// 用于保存所有文本的字符串变量
			// 遍历每一页PDF文档
			for (let i = 1; i <= pdf.numPages; i++) {
				// 加载当前页的文本内容
				await pdf
					.getPage(i)
					.then(function (page) {
						return page.getTextContent();
					})
					.then(function (textContent) {
						// 将当前页的文本内容添加到fullText字符串中
						fullText += textContent.items
							.map(function (item: any) {
								return item.str;
							})
							.join(' ');
					});
			}
			// 在所有页面处理完成后，输出所有文本
		},
		(err) => console.log(err),
	);
	return fullText;
}

export const fileToString = async (file: any) => {
	const data = new Uint8Array(file.buffer);
	return await getStr(data);
};
