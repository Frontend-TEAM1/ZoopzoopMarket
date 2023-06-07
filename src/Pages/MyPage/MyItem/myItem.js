import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ItemCard from 'Components/Card/Card';
import WholeListSkeleton from 'Pages/Skeleton/page/wholeListSkeleton';
import { useInfiniteMyItem } from 'Hooks/Queries/get-infinite-query';

import styled from 'styled-components';

import {
	basicSetting,
	flexAllCenter,
	gridAllCenter,
	gridColumn,
} from 'Styles/common';

const MyItemPage = () => {
	const [category, setCategory] = useState(0);
	const res = useInfiniteMyItem(category);
	const { data, fetchNextPage, refetch, isLoading, isSuccess } = res;
	const [ref, isView] = useInView();

	useEffect(() => {
		if (!isView) return;
		if (data?.pages.length < data.pages[0].data.pagination.endPage)
			fetchNextPage();
	}, [isView]);

	useEffect(() => {
		refetch();
	}, [category]);

	const onClickSaleCategory = () => {
		setCategory(0);
	};

	const onClickFreeCategory = () => {
		setCategory(1);
	};

	return (
		<>
			{isSuccess && (
				<S.Div>
					<S.CategoryZone>
						<S.Category category={category === 0} onClick={onClickSaleCategory}>
							중고 물품
						</S.Category>
						<S.Category category={category === 1} onClick={onClickFreeCategory}>
							무료 나눔
						</S.Category>
					</S.CategoryZone>
					<S.Wrapper>
						{data.pages[0].data.products.length > 0 ? (
							<S.Container>
								{data.pages.map(page => {
									return page.data.products.map(item => (
										<ItemCard
											index={item.idx}
											products={item}
											isMine={true}
											isDone={false}
											createdAt={false}
										/>
									));
								})}
							</S.Container>
						) : (
							<S.Txt>등록된 아이템이 없습니다.</S.Txt>
						)}
						<div ref={ref}></div>
					</S.Wrapper>
				</S.Div>
			)}
			{isLoading && <WholeListSkeleton />}
		</>
	);
};

export default MyItemPage;

const Div = styled.div`
	${basicSetting}
`;

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	@media ${({ theme }) => theme.device.tablet} {
		width: 90%;
	}
	@media ${({ theme }) => theme.device.mobile} {
		width: 95%;
	}
`;

const Container = styled.div`
	width: 100%;
	${gridColumn(4)}
	${gridAllCenter}
	
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

const CategoryZone = styled.div`
	display: flex;
	margin-bottom: 30px;

	> div:first-child {
		border-right: solid 3px ${({ theme }) => theme.color.primary[100]};
	}
`;

const Category = styled.div`
	width: 130px;
	height: 30px;
	${flexAllCenter}
	color: ${({ category }) => (category ? '#FF3647' : 'black')};

	:hover {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
`;

const Txt = styled.div`
	width: 100%;
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-left: 30px;
`;

const S = {
	Div,
	Wrapper,
	Container,
	CategoryZone,
	Category,
	Txt,
};
