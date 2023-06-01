import {
	flexAlignCenter,
	flexAllCenter,
	flexSpaceBetween,
} from 'Styles/common';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FindAddress from 'Components/Address/Desktop/address';
import UserApi from 'Apis/userApi';
import { FORM_TYPE } from 'Consts/FormType';
import CustomButton from 'Components/Buttons/button';
import AlertModal from 'Components/Alert/alertModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUserInfo from 'Hooks/Queries/get-user-profile';

const MyUserEdit = ({ userInfo }) => {
	const navigate = useNavigate();
	const [address, setAddress] = useState();
	const [phoneMessage, setPhoneMessage] = useState();
	const [nickMessage, setNickMessage] = useState('');
	const [modal, setModal] = useState(false);
	const [change, setChange] = useState(false);

	const { data } = useUserInfo();

	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const mutationUser = useMutation(data => {
		return UserApi.userInfoEdit(data);
	});

	const onSubmit = async data => {
		const phoneRegExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
		if (!phoneRegExp.test(data.phone)) {
			setPhoneMessage('핸드폰 번호 양식이 일치하지 않습니다.');
			return setError('phone', {
				shouldFocus: true,
			});
		} else {
			console.log('통과');
			clearErrors('phone');
		}

		const infoEdit = {
			email: data.email,
			nickName: data.nick,
			phone: data.phone,
			region: address,
		};

		try {
			mutationUser.mutate(infoEdit, {
				onSuccess: () => {
					queryClient.invalidateQueries(['userInfo']);
					setModal(true);
					navigate('/mypage/user_edit');
				},
			});
		} catch (err) {
			alert(
				err.response.data.message,
				'비밀번호 변경을 실패하셨습니다, 다시 시도해주세요',
			);
		}
	};

	const onCheckNick = async e => {
		e.preventDefault();
		const value = getValues('nick');
		try {
			const res = await UserApi.checkNickname(value);
			setNickMessage(res.data.message);
		} catch (err) {
			console.log(err);
			setNickMessage(err.response.data.message);
		}
	};

	useEffect(() => {
		setNickMessage();
	}, [getValues('nick')]);

	useEffect(() => {
		if (data) {
			setValue('email', data.email);
			setValue('nick', data.nick_name);
			setValue('phone', data.phone);
			setAddress(data.region);
		}
	}, [data]);

	const onClickPasswordChange = () => {
		navigate('/mypage/user_password_edit');
	};

	const full = !errors.nick && !errors.phone && change;

	return (
		data && (
			<S.Wrap>
				<S.Form onSubmit={handleSubmit(onSubmit)}>
					<S.Container>
						<S.Title>* 아이디</S.Title>
						<S.Box>
							<S.idDiv>{data.email}</S.idDiv>
						</S.Box>
					</S.Container>
					<S.Container>
						<S.Title>* 닉네임</S.Title>
						<S.Box>
							<S.Input
								{...register('nick', FORM_TYPE.NICKNAME)}
								onChange={() => {
									setChange(true);
									setNickMessage('');
								}}
							/>
							<S.CheckBtn
								disabled={errors.nick || !'nick'}
								onClick={onCheckNick}
								shape={'checkBtn'}
								size={'checkBtn'}
							>
								중복확인
							</S.CheckBtn>
							{nickMessage && <S.Error>{nickMessage}</S.Error>}
						</S.Box>
					</S.Container>
					<S.Container>
						<S.Title>* 전화번호</S.Title>
						<S.Box>
							<S.PhoneInput
								maxLength="13"
								{...register('phone', {
									onChange: e => {
										setPhoneMessage('');
										setValue(
											'phone',
											e.target.value
												.replace(/[^0-9]/g, '')
												.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
										),
											setChange(true);
									},
								})}
								placeholder="010-0000-0000"
							/>
							{phoneMessage && <S.Error>{phoneMessage}</S.Error>}
						</S.Box>
					</S.Container>
					<S.Container>
						<S.Title>* 주소</S.Title>
						<S.Box>
							<S.addressDiv>{address}</S.addressDiv>
							<FindAddress setter={setAddress} region={userInfo?.region} />
						</S.Box>
					</S.Container>
					<S.Button
						type="submit"
						disabled={!full}
						size={'submitBtn'}
						shape={'submitBtn'}
					>
						저장하기
					</S.Button>
					{modal && (
						<AlertModal
							content={'회원정보가 변경되었습니다'}
							props={'/mypage/item'}
						/>
					)}
				</S.Form>
				<S.Text onClick={onClickPasswordChange}>비밀번호 변경하기</S.Text>
			</S.Wrap>
		)
	);
};

export default MyUserEdit;

const Wrap = styled.div`
	width: 100%;
	margin: 0 auto;
	flex-direction: column;
	${flexAllCenter}
`;

const Form = styled.form`
	width: 60%;
	min-width: 350px;
	max-width: 800px;
	border: 1px solid ${({ theme }) => theme.color.gray[200]};
	border-radius: 10px;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 50px;
`;

const Input = styled.input`
	border: 1px solid ${({ theme }) => theme.color.gray[200]};
	border-radius: 10px;
	font-size: ${({ theme }) => theme.fontSize.sm};
	padding-left: 15px;
	width: 80%;
	height: 40px;
`;

const PhoneInput = styled.input`
	border: 1px solid ${({ theme }) => theme.color.gray[200]};
	border-radius: 10px;
	padding-left: 15px;
	font-size: ${({ theme }) => theme.fontSize.sm};
	width: 100%;
	height: 40px;
`;

const idDiv = styled.div`
	border: 1px solid ${({ theme }) => theme.color.gray[200]};
	background-color: ${({ theme }) => theme.color.gray[200]};
	font-size: ${({ theme }) => theme.fontSize.sm};
	border-radius: 10px;
	padding-left: 15px;
	width: 100%;
	height: 40px;
	${flexAlignCenter}
`;

const addressDiv = styled.div`
	font-size: ${({ theme }) => theme.fontSize.sm};
	padding-left: 15px;
	margin-right: 30px;
	height: 40px;
	min-width: 130px;
	${flexAlignCenter}
`;

const CheckBtn = styled(CustomButton)`
	width: 100px;
	height: 40px;
	background: ${({ theme }) => theme.color.primary[200]};
	color: ${({ theme }) => theme.color.white};
	margin-left: 10px;
	border: none;
	:hover {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
		background-color: ${({ theme }) => theme.color.primary[300]};
	}
`;

const Button = styled(CustomButton)`
	margin-top: 20px;
	width: 100%;
	background: ${({ theme }) => theme.color.primary[200]};
	border: none;
	color: ${({ theme }) => theme.color.fontColor[100]};
	:hover {
		cursor: pointer;
		font-weight: ${({ theme }) => theme.fontWeight.bold};
		background-color: ${({ theme }) => theme.color.primary[300]};
	}
	:disabled {
		background: ${({ theme }) => theme.color.gray[200]};
	}
`;

const Error = styled.div`
	font-size: ${({ theme }) => theme.fontSize.xs};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.error};
	position: absolute;
	top: 50px;
	left: 15px;
`;

const Text = styled.div`
	margin-top: 40px;
	font-size: ${({ theme }) => theme.fontSize.base};
	color: ${({ theme }) => theme.color.primary[400]};
	padding-bottom: 5px;
	height: 20px;
	:hover {
		border-bottom: 3px double ${({ theme }) => theme.color.primary[200]};
		color: ${({ theme }) => theme.color.primary[500]};
		cursor: pointer;
	}
`;

const Container = styled.div`
	${flexSpaceBetween}
	width: 100%;
	margin-bottom: 30px;
`;

const Box = styled.div`
	width: 80%;
	${flexAlignCenter}
	position: relative;
`;

const Title = styled.div`
	min-width: 90px;
	margin-right: 10px;
	${flexAlignCenter}
	padding-left: 10px;
	@media ${({ theme }) => theme.device.tablet} {
		margin-right: 5px;
	}
`;

const S = {
	Wrap,
	Form,
	Input,
	PhoneInput,
	idDiv,
	addressDiv,
	CheckBtn,
	Button,
	Error,
	Text,
	Container,
	Box,
	Title,
};
