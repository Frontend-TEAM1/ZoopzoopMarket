import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductApi from 'Apis/productApi';
import BuyerDetailPage from './BuyerDetail/BuyerDetail';
import SellerDetailPage from './SellerDetail/SellerDetail';

const ItemDetailPage = () => {
	const { idx } = useParams();
	const { data } = useQuery(['product'], () => ProductApi.detail(idx), {
		onError: err => {
			console.log(err);
		},
	});

	data && console.log(data);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const isSeller = data && data.data.isSeller;

	return (
		<>
			{!isSeller ? (
				<BuyerDetailPage state={isSeller} product={data} />
			) : (
				<SellerDetailPage state={isSeller} product={data} idx={idx} />
			)}
		</>
	);
};

export default ItemDetailPage;
