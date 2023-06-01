import { useQuery } from '@tanstack/react-query';
import UserApi from 'Apis/userApi';

const userInfoProfile = async () => {
	const res = await UserApi.userInfo();
	return res.data;
};

const useUserInfo = () => {
	const { isLoading, isError, data, refetch, error } = useQuery(
		['userInfoProfile'],
		() => userInfoProfile(),
	);

	return { isLoading, isError, data, refetch, error };
};
export default useUserInfo;
