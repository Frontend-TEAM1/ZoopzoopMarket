import styled from 'styled-components';
import { useEffect, useState } from 'react';
import MyProfile from './Components/MyPofile/myProfile';
import ToggleBar from 'Components/Toggle/Toggle';
import UserApi from 'Apis/userApi';
import { Outlet } from 'react-router-dom';
import MyUserEdit2 from './MyUserEdit2/myUserEdit2';
import MyPageApi from 'Apis/myPageApi';
import MyItemPage from './MyItem/Desktop/myItem';

const MyPage = () => {
	const [ToggleState, setToggleState] = useState();
	let mount = '';

	const [userInfo, setUserInfo] = useState();
	const [userProfile, setUserProfile] = useState();

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const res = await UserApi.userInfo();
				setUserInfo(res.data);
			} catch (err) {
				console.log(err);
			}
		};
	
		const getUserProfile = async () => {
			try {
				const res = await MyPageApi.myMainPage();
				setUserProfile(res.data);
			} catch (err) {
				console.log(err);
			}
		};

		getUserInfo();
		getUserProfile();

		mount = 'mount';
	}, []) 

	return (
		<S.Wrapper>
			{userInfo && userProfile && <MyProfile userInfo={userInfo} userProfile={userProfile}/>}
			<ToggleBar setToggleState={setToggleState} />
			{ToggleState === '유저 정보 수정' && <MyUserEdit2 userInfo={userInfo} />}
			<Outlet />
			{mount === '' ? <div></div> : <MyItemPage/>}
		</S.Wrapper>
	);
};

export default MyPage;

const Wrapper = styled.div`
	width: 60%;
	margin: 0 auto;
`;

const S = {
	Wrapper,
};
