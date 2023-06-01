import { useQuery } from '@tanstack/react-query';
import MyPageApi from 'Apis/myPageApi';

const userInfo = async () => {
	const res = await MyPageApi.myMainPage();
	return res.data;
};

const useMyUserInfo = () => {
	const { isLoading, isError, data, refetch, error } = useQuery(
		['userInfo'],
		() => userInfo(),
	);

	return { isLoading, isError, data, refetch, error };
};
export default useMyUserInfo;
