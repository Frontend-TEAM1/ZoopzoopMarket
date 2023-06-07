import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ProductApi from 'Apis/productApi';

import { reviewAtom } from 'Atoms/review.atom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
	flexAlignCenter,
	flexAllCenter,
	flexSpaceBetween,
} from 'Styles/common';

const ReviewItemCard = ({ payIdx, item, original }) => {
	const navigate = useNavigate();
	const setReviewTarget = useSetRecoilState(reviewAtom);

	const onClickDetail = async () => {
		navigate(`/item_detail/${item.idx}`);
		await ProductApi.addRecent(item.idx);
	};

	const onClickReviewDetail = () => {
		navigate(`/review/detail/${original.Review.idx}`);
		setReviewTarget(original);
	};

	useEffect(() => {
		setReviewTarget(item);
	}, [item]);

	const onClickReview = () => {
		navigate(`/review/${payIdx}`);
		setReviewTarget(item);
	};

	const hasReview = original && original.Review !== null;

	const noReview = original && original.Review == null;

	return (
		item && (
			<S.Wrapper>
				<S.Container>
					<S.ItemImg src={item.img_url} />
					<S.ItemInfo>
						<S.ItemTitle>{item.title}</S.ItemTitle>
						<S.ItemPrice>
							{item.price == 0
								? '무료나눔'
								: item.price.toLocaleString() + '원'}
						</S.ItemPrice>
					</S.ItemInfo>
					<S.BtnContainer>
						<S.Btn onClick={() => onClickDetail()}>아이템 보기</S.Btn>
						{noReview && (
							<S.Btn onClick={() => onClickReview()}>리뷰 작성하기</S.Btn>
						)}
						{hasReview && (
							<S.Btn onClick={() => onClickReviewDetail()}>작성한 리뷰</S.Btn>
						)}
					</S.BtnContainer>
				</S.Container>
			</S.Wrapper>
		)
	);
};

export default ReviewItemCard;

const Wrapper = styled.div`
	${flexSpaceBetween}
	margin-top: 20px;
	width: 100%;
`;

const Container = styled.div`
	${flexAlignCenter}
	width: 100%;
	min-width: 350px;
	border-radius: 10px;
	box-shadow: rgba(100, 111, 124, 0.2) 0px 2px 5px;
	padding: 10px 20px;
	position: relative;
	:hover {
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 5px;
	}
`;

const ItemImg = styled.img`
	width: 50px;
	height: 50px;
	object-fit: cover;
`;

const ItemInfo = styled.div`
	padding-left: 30px;
	${flexAlignCenter}
	flex-direction: column;

	@media (max-width: 680px) {
		padding-left: 15px;
	}
`;

const ItemTitle = styled.div`
	font-size: ${({ theme }) => theme.fontSize.sm};
	font-weight: ${({ theme }) => theme.fontWeight.bolder};
	padding-bottom: 10px;
	width: 200px;
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (max-width: 680px) {
		width: 120px;
		font-size: ${({ theme }) => theme.fontSize.es};
	}
	@media (max-width: 560px) {
		width: 100px;
		font-size: ${({ theme }) => theme.fontSize.es};
	}
`;

const ItemPrice = styled.span`
	width: 200px;
	font-size: ${({ theme }) => theme.fontSize.sm};
	color: ${({ theme }) => theme.color.gray[300]};
	@media (max-width: 680px) {
		font-size: ${({ theme }) => theme.fontSize.es};
	}
`;

const BtnContainer = styled.div`
	${flexAllCenter}
	position: absolute;
	right: 10px;
	@media (max-width: 800px) {
		top: 10px;
	}
`;

const Btn = styled.button`
	border: none;
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize.xs};
	height: 30px;
	margin-left: 10px;
	padding: 20px 15px;
	cursor: pointer;
	${flexAllCenter}
	:hover {
		background-color: ${({ theme }) => theme.color.primary[100]};
	}
	@media (max-width: 800px) {
		padding: 5px;
		font-size: ${({ theme }) => theme.fontSize.es};
	}
`;

const S = {
	Wrapper,
	Container,
	ItemImg,
	ItemInfo,
	ItemTitle,
	ItemPrice,
	BtnContainer,
	Btn,
};
