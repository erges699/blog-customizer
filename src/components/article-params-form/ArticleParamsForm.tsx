import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';
import { Select } from 'components/select';
import { Text } from 'components/text';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { useRef, useState, SyntheticEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

export type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const handleFormSubmit = (e: SyntheticEvent) => {
		console.log('Form submitted');
		e.preventDefault();
		console.log('Current state:', { fontFamily, fontSize, fontColor });
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			fontSizeOption: fontSize,
			contentWidth: contentWidth,
		});
	};

	const handleFormReset = () => {
		setArticleState(defaultArticleState),
			setFontFamily(defaultArticleState.fontFamilyOption),
			setFontColor(defaultArticleState.fontColor),
			setBackgroundColor(defaultArticleState.backgroundColor),
			setFontSize(defaultArticleState.fontSizeOption),
			setContentWidth(defaultArticleState.contentWidth);
	};

	const ref = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: sidebarIsOpen,
		rootRef: ref,
		onClose: () => setSidebarIsOpen(false),
	});

	return (
		<div ref={ref}>
			<ArrowButton
				isOpen={sidebarIsOpen}
				onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: sidebarIsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						name='fontSize'
						title='размер шрифта'
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
