import ItemCard from 'Components/Card/Desktop/Card';
import { useInfiniteMyItem } from 'Hooks/Queries/get-infinite-myItem';
import { flexAllCenter, gridAllCenter, gridColumn } from 'Styles/common';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const MyItemPage = () => {
	const [category, setCategory] = useState(0); // 0:중고 1:무료
	const res = useInfiniteMyItem(category);
	const { data, fetchNextPage, refetch } = res;
	const [ref, isView] = useInView();

	useEffect(() => {
		if (!isView) {
			return;
		} else if (
			data &&
			data.pages.length < data.pages[0].data.pagination.endPage
		) {
			fetchNextPage();
		}
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
		data && (
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
									<ItemCard index={item.idx} products={item} isMine={true} />
								));
							})}
						</S.Container>
					) : (
						<S.Txt>등록된 아이템이 없습니다.</S.Txt>
					)}
					<div ref={ref}></div>
				</S.Wrapper>
			</S.Div>
		)
	);
};

export default MyItemPage;

const Div = styled.div`
	margin: 0 auto;
	width: 70%;
	min-width: 700px;
	max-width: 1200px;
`;

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
`;

const Container = styled.div`
	width: 100%;
	${gridColumn(4)}
	${gridAllCenter}
	@media ${({ theme }) => theme.device.pc} {
		min-width: 200px; // pc -> laptop 사이즈 줄어들떼 카드 최소 사이즈 적용 안되는 이슈 있음
	}
	@media ${({ theme }) => theme.device.laptop} {
		${gridColumn(3)}
		min-width: 200px;
	}
	@media ${({ theme }) => theme.device.tablet} {
		${gridColumn(2)}
		min-width: 200px;
	}
	@media ${({ theme }) => theme.device.mobile} {
		${gridColumn(1)}
		min-width: 200px;
	}
`;

const CategoryZone = styled.div`
	display: flex;
	margin-bottom: 30px;
	& > div:first-child {
		border-right: solid 3px ${({ theme }) => theme.color.primary[100]};
	}
`;

const Category = styled.div`
	width: 130px;
	height: 30px;
	${flexAllCenter}
	:hover {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
	color: ${({ category }) => (category ? '#FF3647' : 'black')};
`;

const Txt = styled.div`
	width: 100%;
	font-size: ${({ theme }) => theme.fontSize.base};
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
