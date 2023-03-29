import React from 'react';
import Styles from './featureList.module.scss';
import { OpenAIFeatureList } from '../../util/openai/openAIFeature';
import { Link } from 'react-router-dom';
interface FeatureListProps {
  list: OpenAIFeatureList;
}
const FeatureList = ({ list }: FeatureListProps) => {
	return (
		<div className={Styles.featureList}>
			{list.map((feature) => {
				return (
					<Link
						to={feature.url}
						className={Styles.featureItem}
						key={feature.type}
					>
						<div>{feature.name}</div>
					</Link>
				);
			})}
		</div>
	);
};

export default FeatureList;
