import MobileCard from 'Components/Card/Mobile/MobileCard';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

const MobilePreview = ({ categoryData, userLocation, userName }) => {
	let category = categoryData === 1 ? '중고 물품' : '무료나눔';
	let categoryText =
		categoryData === 1
			? `${userLocation} 인기 줍줍템!`
			: `${userName}님 주변의 무료나눔 물품들이에요!`;

	const itemList = [1, 2, 3, 4, 5, 6, 7, 8];

	const [swiper, setSwiper] = useState(null);

	const handleNext = () => {
		swiper.slideNext();
	};

	const handlePrev = () => {
		swiper.slidePrev();
	};

	return (
		<S.Wrapper>
			<S.UpperSwiper>
				<S.CategoryBox>{category}</S.CategoryBox>
				{userLocation && <S.CategoryText>{categoryText}</S.CategoryText>}
				<S.More to={`/search_list?categoryData=${categoryData}`}>
					{' '}
					더보기 &gt;{' '}
				</S.More>
			</S.UpperSwiper>
			<S.SwiperWrapper>
				<S.Btn onClick={handlePrev}> &lt;</S.Btn>
				<Swiper onSwiper={setSwiper} spaceBetween={0} slidesPerView={1}>
					{itemList.map(item => (
						<SwiperSlide>
							<MobileCard key={item} />
						</SwiperSlide>
					))}
				</Swiper>

				<S.Btn onClick={handleNext}> &gt;</S.Btn>
			</S.SwiperWrapper>
		</S.Wrapper>
	);
};

export default MobilePreview;

const Wrapper = styled.div`
	margin: 0 auto;
	margin-top: 25px;
	margin-bottom: 60px;
`;

const UpperSwiper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
`;

const CategoryBox = styled.div`
	width: 80px;
	height: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: ${({ theme }) => theme.fontSize.es};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	background-color: ${({ theme }) => theme.color.primary};
	color: ${({ theme }) => theme.color.white};
	border-radius: 10px;
`;

const CategoryText = styled.div`
	width: 350px;
	font-size: ${({ theme }) => theme.fontSize.xs};
	margin: 0 10px;
`;

const More = styled(Link)`
	width: 80px;
	font-size: ${({ theme }) => theme.fontSize.xs};
	text-align: end;
	cursor: pointer;
	:hover {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
`;

const SwiperWrapper = styled.div`
	padding: 10px;
	border: 1px solid ${({ theme }) => theme.color.subBeigeGreen};
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Btn = styled.button`
	border: none;
	font-size: ${({ theme }) => theme.fontSize.big};
	background: none;
	width: 70px;
	cursor: pointer;
	:hover {
		color: ${({ theme }) => theme.color.primary};
	}
`;

const S = {
	Wrapper,
	UpperSwiper,
	CategoryBox,
	CategoryText,
	More,
	SwiperWrapper,
	Btn,
};
