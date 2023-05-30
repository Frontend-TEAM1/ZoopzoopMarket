import styled from 'styled-components';
import { gridAllCenter, gridColumn, gridGap } from 'Styles/common';
import useInfiniteMy from 'Hooks/Queries/get.infinity.interest';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ItemCard from 'Components/Card/Desktop/Card';

const MyInterestPage = () => {
	const res = useInfiniteMy();
	const [ref, inView] = useInView({ threshold: 0.5 });
	const { data, fetchNextPage, isLoading } = res;

	useEffect(() => {
		if (!inView) {
			return;
		}
		fetchNextPage();
	}, [inView]);

	return (
		<>
			{isLoading ? (
				<div>로딩</div> // 임시 로딩
			) : (
				<S.Wrap>
					<S.Container>
						{data.pages.map(page =>
							page.data.LikeList.map(list => (
								<S.Card>
									<ItemCard index={list.Product.idx} products={list.Product} />
								</S.Card>
							)),
						)}
					</S.Container>
					<div ref={ref}></div>
				</S.Wrap>
			)}
		</>
	);
};

export default MyInterestPage;

const Wrap = styled.div`
	margin: 0 auto;
	width: 70%;
	min-width: 700px;
	max-width: 1200px;
`;

const Container = styled.div`
	width: 100%;
	${gridColumn(4)}
	${gridAllCenter}
	// 선영님 코드
	/* @media ${({ theme }) => theme.device.tablet} {
		${gridColumn(3)}
		${gridGap.tablet}
	}
	@media ${({ theme }) => theme.device.mobile} {
		${gridColumn(2)}
		${gridGap.mobile}
	} */
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

const Card = styled.div`
	width: 100%;
`;

const HeartZone = styled.div`
	width: 250px;
	height: 80px;
	background-color: lightgray;
`;

const S = {
	Container,
	Card,
	HeartZone,
	Wrap,
};
