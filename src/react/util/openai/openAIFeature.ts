export type OpenAIFeatureList = Array<OpenAIFeature>
interface OpenAIFeature {
    name: string;
    type:string;
    description: string;
    url:string;
}
export const featureList:OpenAIFeatureList = [
	{
		name:'对话',
		type:'chat',
		description:'openAI API chat测试',
		url:'openAI/chat'
	}
];