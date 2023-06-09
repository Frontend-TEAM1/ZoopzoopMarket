import { useQuery } from '@tanstack/react-query';

import ProductApi from 'Apis/productApi';

import SearchList from 'Pages/SearchList/components/searchList';

import styled from 'styled-components';

const RecentSoldOut = ({ word }) => {
	const { data } = useQuery(['SEARCH_SOLDOUT', word], () =>
		ProductApi.searchItems(1, word, 0, '판매완료'),
	);

	return (
		<S.Wrapper>
			{data &&
				data.data.product.map((product, index) => (
					<SearchList products={product} key={index} />
				))}
		</S.Wrapper>
	);
};
export default RecentSoldOut;

const Wrapper = styled.div`
	width: 100%;
	display: grid;
	justify-items: center;
	margin-bottom: 30px;

	@media screen and (max-width: 767px) {
		grid-template-columns: repeat(2, minmax(200px, 1fr));
		column-gap: 10px;
		row-gap: 15px;
	}
	@media screen and (min-width: 768px) and (max-width: 1000px) {
		grid-template-columns: repeat(2, minmax(250px, 1fr));
		column-gap: 20px;
		row-gap: 30px;
	}
	@media screen and (min-width: 1001px) and (max-width: 1499px) {
		grid-template-columns: repeat(3, minmax(270px, 1fr));
		column-gap: 30px;
		row-gap: 40px;
	}
	@media screen and (min-width: 1500px) {
		grid-template-columns: repeat(4, minmax(280px, 1fr));
		column-gap: 30px;
		row-gap: 50px;
	}
`;

const S = {
	Wrapper,
};
