import styled from 'styled-components';
import { gridAllCenter, gridColumn, gridGap } from 'Styles/common';
import useInfiniteMy from 'Hooks/Queries/get.infinity.interest';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import ItemCard from 'Components/Card/Desktop/Card';
// import NotificationModal from 'Components/Alert/notificationModal';

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
					{data.pages[0].data.LikeList.length <= 0 ? (
						<S.Txt>등록된 관심템이 없습니다.</S.Txt>
					) : (
						<S.Container>
							{data.pages.map(page =>
								page.data.LikeList.map(list => (
									<S.Card>
										<ItemCard
											index={list.Product.idx}
											products={list.Product}
										/>
									</S.Card>
								)),
							)}
						</S.Container>
					)}
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
	@media ${({ theme }) => theme.device.tablet} {
		width: 90%;
	}
	@media ${({ theme }) => theme.device.mobile} {
		width: 95%;
	}
`;

const Container = styled.div`
	width: 100%;
	${gridColumn(3)}
	${gridAllCenter}
	
	@media ${({ theme }) => theme.device.mobile} {
		${gridColumn(2)}
		${gridGap.mobile}
	}
	@media ${({ theme }) => theme.device.tablet} {
		${gridColumn(2)}
		${gridGap.tablet}
	}
	@media ${({ theme }) => theme.device.laptop} {
		${gridColumn(3)}
		${gridGap.tablet}
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

const Txt = styled.div`
	width: 100%;
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-top: 30px;
	margin-left: 0px;
`;

const S = {
	Container,
	Card,
	HeartZone,
	Wrap,
	Txt,
};
