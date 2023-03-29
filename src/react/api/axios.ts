import axios from 'axios';
import { OpenAIAPIConfig } from '../util/openai/openAIConfig';
import { axiosConfig } from './axiosConfig';
const MyAxios = axios.create({
	...axiosConfig,
	headers:{
		'Content-Type':'application/json',
		'withCredentials':true,
		'responseType':OpenAIAPIConfig.stream?'stream':'application/json'
	}
});

MyAxios.interceptors.request.use((config) => {
	config.headers['Authorization'] = `Bearer ${OpenAIAPIConfig.apiKey}`;
	return config;
},(err) => {
	console.error(err);
	return err;
});

MyAxios.interceptors.response.use((config) => {return config;},(err) => {return err;});

export default MyAxios;