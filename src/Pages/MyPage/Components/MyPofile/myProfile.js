import UserApi from 'Apis/userApi';
import MannerMeter from 'Components/Icon/Icon';
import Profile from 'Components/Profile/Desktop/profile';
import { flexAllCenter } from 'Styles/common';
import { useEffect } from 'react';
import styled from 'styled-components';

const MyProfile = ({ userInfo, userProfile }) => {
	const { region } = userInfo;
	const { User, ondo } = userProfile;

	const profileImgEdit = async () => {
		const formData = new FormData();
		formData.append('profile_url');

		try {
			const res = await UserApi.userProfileEdit(formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		profileImgEdit();
	}, []);

	return (
		<S.Wrapper>
			<div>
				<div>
					<Profile userProfileUrl={User.profileUrl} />
				</div>
				<div>
					반가워요, <S.nickName>{User.nickName}</S.nickName>님 :)
				</div>
				<S.Icon>
					<MannerMeter ondo={ondo} />
				</S.Icon>
				<div>{region}</div>
			</div>
			<div>
				<div>로그아웃</div>
			</div>
		</S.Wrapper>
	);
};

export default MyProfile;

const Wrapper = styled.div`
	${flexAllCenter}
	justify-content: space-between;
	& > div:first-child {
		${flexAllCenter}
		&>div>* {
			margin: 0 20px;
		}
	}
`;

const Icon = styled.div`
	${flexAllCenter}
	justify-content: start;
`;

const nickName = styled.h1`
	/* font-size: ${({ theme }) => theme.fontSize.big}; */
	display: inline;
	margin: 0;
`;

const S = {
	Wrapper,
	Icon,
	nickName,
};
