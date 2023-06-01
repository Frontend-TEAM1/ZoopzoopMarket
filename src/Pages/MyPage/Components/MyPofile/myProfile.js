import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import UserApi from 'Apis/userApi';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useUserInfo from 'Hooks/Queries/get-user-profile';
import MannerMeter from 'Components/Icon/Icon';
import { useMutation } from '@tanstack/react-query';
import useMyUserInfo from 'Hooks/Queries/get-user-info';

const MyProfile = () => {
	const [profileImg, setProfileImg] = useState();
	const photoInput = useRef();
	const { data, refetch, isLoading } = useUserInfo();
	const { data: myData } = useMyUserInfo();

	const { mutate } = useMutation(
		formData => UserApi.userProfileEdit(formData),
		{
			onSuccess: () => {
				refetch();
			},
		},
	);

	const profileImgEdit = e => {
		if (!e.target.files[0]) return;
		const formData = new FormData();
		const file = e.target.files[0];
		formData.append('profile_url', file);

		const imageUrl = URL.createObjectURL(file);
		setProfileImg(imageUrl);

		mutate(formData);
	};

	const handleClick = () => {
		photoInput.current.click();
	};

	useEffect(() => {
		// getUserProfile();
	}, [profileImg]);

	// console.log('프로필', userProfile);

	return (
		<>
			{!isLoading && (
				<S.Wrapper>
					{data && myData && (
						<S.Info>
							<S.ImgWrap>
								<S.Img
									src={
										data.profile_url
											? profileImg
												? profileImg
												: data.profile_url
											: '/Assets/Images/기본 프로필.png'
									}
								/>
								<S.ProfileImg>
									<S.FontAwesomeIconImg
										icon={faCamera}
										style={{ color: '#ffffff', fontSize: '15px' }}
										onClick={handleClick}
									/>
									<input
										type="file"
										accept="image/jpg, image/jpeg, image/png"
										multiple
										ref={photoInput}
										style={{ display: 'none' }}
										onChange={e => profileImgEdit(e)}
									/>
								</S.ProfileImg>
							</S.ImgWrap>
							<S.Detail>
								<S.List>
									<S.InfoTitle>닉네임</S.InfoTitle>
									{myData.User && (
										<S.InfoContent>{myData.User.nickName}</S.InfoContent>
									)}
								</S.List>
								<S.List>
									<S.InfoTitle>매너온도</S.InfoTitle>
									<S.InfoContent>
										<MannerMeter ondo={myData.ondo} />
									</S.InfoContent>
								</S.List>
								<S.List>
									<S.InfoTitle>활동지역</S.InfoTitle>
									<S.InfoContent>#{data.region}</S.InfoContent>
								</S.List>
							</S.Detail>
							<S.Detail>
								<S.List>
									<S.InfoTitle>내 등록템</S.InfoTitle>
									<S.InfoContent>
										<span>
											{myData.productsCount ? myData.productsCount : 0}
										</span>{' '}
										개
									</S.InfoContent>
								</S.List>
								<S.List>
									<S.InfoTitle>내 관심템</S.InfoTitle>
									<S.InfoContent>
										<span>{myData.likeCount}</span> 개
									</S.InfoContent>
								</S.List>
								<S.List>
									<S.InfoTitle>채팅</S.InfoTitle>
									<S.InfoContent>
										<span>{myData.chatCount}</span> 건
									</S.InfoContent>
								</S.List>
							</S.Detail>
						</S.Info>
					)}
				</S.Wrapper>
			)}
		</>
	);
};

export default MyProfile;

const Wrapper = styled.div`
	width: 70%;
	min-width: 700px;
	max-width: 1200px;
	height: 30%;
	padding-bottom: 30px;
	margin: 0 auto;
`;

const Info = styled.div`
	display: flex;
	align-items: center;
	margin-top: 60px;
	margin-left: 20px;
	padding-left: 10px;
	@media ${({ theme }) => theme.device.tablet} {
		width: 80vw;
		margin-left: 0;
	}
	@media ${({ theme }) => theme.device.mobile} {
		width: 80vw;
		margin-left: 0;
	}
`;

const Img = styled.img`
	width: 100px;
	object-fit: cover;
	object-position: center;
	border-radius: 50%;
	@media ${({ theme }) => theme.device.tablet} {
		width: 14vw;
	}
	@media ${({ theme }) => theme.device.mobile} {
		width: 13vw;
	}
`;

const ImgWrap = styled.div`
	position: relative;
	@media ${({ theme }) => theme.device.tablet} {
		margin: 0px;
	}
	@media ${({ theme }) => theme.device.mobile} {
		margin: 0px;
	}
`;

const ProfileImg = styled.div`
	background-color: ${({ theme }) => theme.color.primary[400]};
	padding: 12px;
	border-radius: 50%;
	position: absolute;
	bottom: 0;
	right: 0;
	cursor: pointer;
	@media ${({ theme }) => theme.device.tablet} {
		padding: 2vw;
		border-radius: 50%;
	}
	@media ${({ theme }) => theme.device.mobile} {
		padding: 1vw;
		bottom: 100px;
		border-radius: 50%;
	}
`;

const FontAwesomeIconImg = styled(FontAwesomeIcon)`
	@media ${({ theme }) => theme.device.tablet} {
		font-size: 3vw;
	}
	@media ${({ theme }) => theme.device.mobile} {
		font-size: 5px;
	}
`;
const Detail = styled.div`
	margin-left: 60px;
	line-height: 2rem;
	@media ${({ theme }) => theme.device.tablet} {
		margin-left: 30px;
	}
	@media ${({ theme }) => theme.device.mobile} {
		font-size: 10px;
	}
`;

const List = styled.div`
	height: max-content;
	display: flex;
	margin: 5px;
`;

const InfoTitle = styled.div`
	width: 80px;
	min-width: max-content;
	height: max-content;
	font-size: ${({ theme }) => theme.fontSize.sm};
	color: ${({ theme }) => theme.color.gray[300]};
	@media ${({ theme }) => theme.device.tablet} {
		font-size: ${({ theme }) => theme.fontSize.xs};
	}
	@media ${({ theme }) => theme.device.mobile} {
		font-size: ${({ theme }) => theme.fontSize.es};
	}
`;

const InfoContent = styled.div`
	margin-left: 10px;
	min-width: max-content;
	font-size: ${({ theme }) => theme.fontSize.sm};
	font-weight: ${({ theme }) => theme.fontWeight.bolder};
	@media ${({ theme }) => theme.device.tablet} {
		font-size: ${({ theme }) => theme.fontSize.xs};
		margin-left: 0;
	}
	@media ${({ theme }) => theme.device.mobile} {
		font-size: ${({ theme }) => theme.fontSize.es};
		margin-left: 0;
	}

	& > span {
		color: ${({ theme }) => theme.color.primary[400]};
		font-size: ${({ theme }) => theme.fontSize.base};
		font-weight: ${({ theme }) => theme.fontWeight.bolder};
		@media ${({ theme }) => theme.device.tablet} {
			font-size: ${({ theme }) => theme.fontSize.sm};
		}
		@media ${({ theme }) => theme.device.mobile} {
			font-size: ${({ theme }) => theme.fontSize.xs};
		}
	}
`;

const S = {
	Wrapper,
	Info,
	Detail,
	ProfileImg,
	ImgWrap,
	List,
	InfoTitle,
	InfoContent,
	Img,
	FontAwesomeIconImg,
};
