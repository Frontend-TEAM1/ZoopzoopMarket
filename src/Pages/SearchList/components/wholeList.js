import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import SearchList from './searchList';
import WholeListSkeleton from 'Pages/Skeleton/page/wholeListSkeleton';
import { useInfiniteSearch } from 'Hooks/Queries/get-infinite-query';

import styled from 'styled-components';
import { basicSetting } from 'Styles/common';

const WholeListPage = () => {
	const { word, category } = useParams();

	const res =
		word == ','
			? useInfiniteSearch(word.split(',')[0], category, '판매중')
			: useInfiniteSearch(word.split('·')[0], category, '판매중');
	let searchWord = word;
	if (word == ',') searchWord = '전체';

	const [ref, inView] = useInView({ threshold: 0.5 });
	const navigate = useNavigate();

	const { data, isSuccess } = res;
	let categoryResult = '';
	category == 0 ? (categoryResult = '중고템') : (categoryResult = '무료템');

	const [selected, setSelected] = useState(category);

	useEffect(() => {
		window.scrollTo(0, 0);
		res.refetch();
		setSelected(category);
	}, [category]);

	const onSearchClick = selected => {
		if (selected == 1) {
			navigate(`/search_list/${word}/1`);
		} else if (selected == 0) {
			navigate(`/search_list/${word}/0`);
		} else navigate(`/search_list/${word}`);
	};

	useEffect(() => {
		if (!inView) return;
		res.fetchNextPage();
	}, [inView]);

	return (
		<S.Wrapper>
			<S.SelectContainer>
				<S.BoxContainer>
					{word.split(',').length <= 2 && word !== ',' && (
						<S.SelectBox
							isSelected={selected === 2}
							onClick={() => {
								onSearchClick(2);
							}}
						>
							통합
						</S.SelectBox>
					)}
					<S.SelectBox
						isSelected={selected == 0}
						onClick={() => {
							onSearchClick(0);
						}}
					>
						중고
					</S.SelectBox>
					<S.SelectBox
						isSelected={selected == 1}
						onClick={() => {
							onSearchClick(1);
						}}
					>
						무료
					</S.SelectBox>
				</S.BoxContainer>
			</S.SelectContainer>
			{isSuccess && (
				<>
					{data && data.pages[0].data.product[0] ? (
						<S.ResultText>
							<S.ResultWord>"{searchWord}"</S.ResultWord>에 대한{' '}
							{categoryResult} 검색 결과
						</S.ResultText>
					) : (
						<S.ResultText>
							<S.ResultWord>"{searchWord}"</S.ResultWord> {categoryResult}에
							대한 검색 결과가 없습니다.
						</S.ResultText>
					)}
				</>
			)}
			{isSuccess && (
				<S.Container>
					{data &&
						data.pages.map(pageItems =>
							pageItems.data.product.map(product => (
								<SearchList key={product.idx} products={product} />
							)),
						)}
				</S.Container>
			)}
			{!isSuccess && <WholeListSkeleton />}
			<S.refDiv ref={ref}></S.refDiv>
		</S.Wrapper>
	);
};
export default WholeListPage;

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
`;

const SelectContainer = styled.div`
	width: 100%;
	height: 40px;
	text-align: center;
	display: flex;
	background-color: ${({ theme }) => theme.color.gray[100]};
`;

const BoxContainer = styled.div`
	display: flex;
	${basicSetting}
`;

const SelectBox = styled.div`
	cursor: pointer;
	margin: 10px 10px;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ isSelected }) =>
		isSelected
			? ({ theme }) => theme.color.primary[300]
			: ({ theme }) => theme.color.black};
`;

const ResultText = styled.div`
	width: 70%;
	display: flex;
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bolder};
	min-width: 350px;
	max-width: 1200px;
	margin: 30px auto;

	@media (max-width: 700px) {
		width: 95%;
	}
	@media (max-width: 800px) {
		width: 95%;
	}
`;

const ResultWord = styled.div`
	color: ${({ theme }) => theme.color.primary[300]};
`;

const Container = styled.div`
	width: 70%;
	display: grid;
	justify-items: center;
	margin: 30px auto;

	@media (max-width: 700px) {
		width: 95%;
	}
	@media (max-width: 800px) {
		width: 90%;
	}
	@media screen and (max-width: 400px) {
		grid-template-rows: repeat(2, minmax(180px, 1fr));
		column-gap: 10px;
	}
	@media screen and (max-width: 767px) {
		grid-template-columns: repeat(2, minmax(180px, 1fr));
		column-gap: 10px;
		row-gap: 20px;
	}
	@media screen and (min-width: 768px) and (max-width: 1000px) {
		grid-template-columns: repeat(2, minmax(250px, 1fr));
		column-gap: 20px;
		row-gap: 30px;
	}
	@media screen and (min-width: 1001px) and (max-width: 1499px) {
		grid-template-columns: repeat(3, minmax(270px, 1fr));
		column-gap: 20px;
		row-gap: 35px;
	}
	@media screen and (min-width: 1500px) {
		grid-template-columns: repeat(4, minmax(280px, 1fr));
		column-gap: 20px;
		row-gap: 40px;
	}
`;

const refDiv = styled.div``;

const S = {
	Wrapper,
	SelectContainer,
	BoxContainer,
	SelectBox,
	ResultText,
	ResultWord,
	Container,
	refDiv,
};
