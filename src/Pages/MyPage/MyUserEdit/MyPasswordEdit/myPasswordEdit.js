import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import UserApi from 'Apis/userApi';

import CustomButton from 'Components/Buttons/button';
import AlertModal from 'Components/Alert/alertModal';

import { FORM_TYPE } from 'Consts/FormType';

import {
	flexAlignCenter,
	flexAllCenter,
	flexSpaceBetween,
} from 'Styles/common';
import styled from 'styled-components';

const MyPasswordEdit = () => {
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);
	const [change, setChange] = useState(false);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const { mutate } = useMutation(info => UserApi.userPasswordEdit(info), {
		onSuccess: () => {
			setModal(true);
		},
		onError: err => {
			alert(err.response.data.message);
		},
	});

	const onSubmit = async data => {
		const info = {
			pw: data.password,
		};
		mutate(info);
	};

	const onClickExit = () => {
		navigate('/mypage/user_edit');
	};

	const full = !errors.password && !errors.confirmPW && change;

	return (
		<>
			<S.Wrap>
				<S.Form onSubmit={handleSubmit(onSubmit)}>
					<S.Txt>
						90일마다 비밀번호를 변경하여 <br /> 소중한 개인정보를 보호하세요!
					</S.Txt>
					<S.Container>
						<S.Title>비밀번호</S.Title>
						<S.Box>
							<S.Input
								{...register('password', FORM_TYPE.PASSWORD)}
								placeholder="특수문자, 영어, 숫자 포함 8자이상"
								type="password"
							/>
							{errors.password && <S.Error>{errors.password.message}</S.Error>}
						</S.Box>
					</S.Container>
					<S.Container>
						<S.Title>비밀번호 확인</S.Title>
						<S.Box>
							<S.Input
								{...register('confirmPW', {
									required: true,
									validate: value => {
										if (getValues('password') !== value) {
											return '비밀번호를 다시 확인해 주세요';
										} else setChange(true);
									},
								})}
								placeholder="PW check"
								type="password"
							/>
							{errors.confirmPW && (
								<S.Error>{errors.confirmPW.message}</S.Error>
							)}
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
							content={'비밀번호가 변경되었습니다.'}
							props={'/mypage/user_edit'}
						/>
					)}
				</S.Form>
				<S.Text onClick={onClickExit}>취소하기</S.Text>
			</S.Wrap>
		</>
	);
};

export default MyPasswordEdit;

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
	${flexAlignCenter}
	flex-direction: column;
	padding: 50px;
	@media ${({ theme }) => theme.device.tablet} {
		width: 90%;
		padding: 20px 10px 20px 10px;
	}
`;

const Txt = styled.div`
	${flexAllCenter}
	color : ${({ theme }) => theme.color.primary[200]};
	font-size: ${({ theme }) => theme.fontSize.md};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-bottom: 40px;
	line-height: 30px;
	@media ${({ theme }) => theme.device.tablet} {
		font-size: ${({ theme }) => theme.fontSize.base};
		margin-bottom: 20px;
	}
`;

const Container = styled.div`
	${flexSpaceBetween}
	width: 100%;
	margin-bottom: 30px;
`;

const Title = styled.div`
	min-width: 95px;
	margin-right: 10px;
	${flexAlignCenter}
	padding-left: 10px;
	@media ${({ theme }) => theme.device.tablet} {
		margin-right: 5px;
		font-size: ${({ theme }) => theme.fontSize.sm};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
`;

const Box = styled.div`
	width: 80%;
	${flexAlignCenter}
	position: relative;
	@media ${({ theme }) => theme.device.tablet} {
		width: 70%;
	}
`;

const Input = styled.input`
	border: 1px solid ${({ theme }) => theme.color.gray[200]};
	border-radius: 10px;
	padding-left: 15px;
	font-size: ${({ theme }) => theme.fontSize.sm};
	width: 100%;
	height: 40px;
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
	@media ${({ theme }) => theme.device.tablet} {
		margin-top: 10px;
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

const S = {
	Wrap,
	Form,
	Txt,
	Container,
	Title,
	Box,
	Input,
	Button,
	Error,
	Text,
};
