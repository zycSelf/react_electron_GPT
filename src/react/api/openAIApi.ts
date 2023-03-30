import { OpenAIAPIConfig } from '../util/openai/openAIConfig';
import MyAxios from './axios';
export interface ChatParams {
	model: string;
	messages: Array<ChatAskItem>;
}
export interface ChatAskItem {
	role: string;
	askId?: number | string;
	content: string;
}

export const OpenAIApi = {
	chat: async (params: ChatParams) => {
		return {
			data: {
				id: 'chatcmpl-6xUcJozxFouzLCd8k7n86P38c21U8',
				object: 'chat.completion',
				created: new Date().getTime(),
				model: 'gpt-3.5-turbo-0301',
				usage: {
					prompt_tokens: 18,
					completion_tokens: 354,
					total_tokens: 372,
				},
				choices: [
					{
						message: {
							role: 'assistant',
							content:
								'下面是使用 JavaScript 编写的冒泡排序代码：\n\n```\nfunction bubbleSort(arr) {\n  var len = arr.length;\n  for (var i = 0; i < len - 1; i++) {\n    for (var j = 0; j < len - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) {\n        var temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}\n```\n\n这段代码使用了两个 for 循环来实现冒泡排序。外部循环控制整个排序过程，内部循环负责相邻元素间的比较和交换。每一轮交换会把未排序部分中最大的元素移动到它应该在的位置上。\n\n在函数内部，我们首先获取传入数组的长度，使用外部循环控制排序轮数，使用内部循环负责相邻元素的比较和交换。如果相邻元素的顺序不正确，则交换它们的位置。最后，返回排序后的数组。\n\n示例：\n\n```\nvar arr = [3, 7, 2, 4, 1, 5, 6];\nconsole.log(bubbleSort(arr)); // 输出 [1, 2, 3, 4, 5, 6, 7]\n```',
						},
						finish_reason: 'stop',
						index: 0,
					},
				],
			},
		};
		// return MyAxios.post('/openai/chat', JSON.stringify(params))
		// 	.then((res) => {
		// 		return res;
		// 	})
		// 	.catch((err) => console.error(err));
	},
	fileConversion: async (params: FormData) => {
		return MyAxios.post('/openai/fileConversion', params, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			transformRequest: [(data) => data],
		})
			.then((res) => {
				return res;
			})
			.catch((err) => console.error(err));
	},
};

export const testData = {
	data: {
		id: 'chatcmpl-123',
		object: 'chat.completion',
		created: 1677652288,
		choices: [
			{
				index: 0,
				message: {
					role: 'assistant',
					content: '\n\nHello there, how may I assist you today?',
				},
				finish_reason: 'stop',
			},
		],
		usage: {
			prompt_tokens: 9,
			completion_tokens: 12,
			total_tokens: 21,
		},
	},
};
