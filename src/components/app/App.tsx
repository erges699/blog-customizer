import styles from './app.module.scss';
import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article/Article';
import { ArticleParamsForm } from 'components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};
