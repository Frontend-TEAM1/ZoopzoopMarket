import { flexAlignCenter, flexAllCenter } from 'Styles/common';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UserApi from 'Apis/userApi';
import { FORM_TYPE } from 'Consts/FormType';

const MyPasswordEdit = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({ mode: 'onChange' });

	const onSubmit = async data => {
		const info = {
			pw: data.password,
		};

		try {
			await UserApi.userPasswordEdit(info);
			alert('비밀번호가 변경되었습니다.');
			navigate('/mypage');
		} catch (err) {
			// alert(err.response.data.message);
			console.log(err);	// 확인용
		}
	};

	const full =
		!errors.password &&
		!errors.confirmPW;

	return (
		<S.Div>
			<S.Wrap>
				<S.Form onSubmit={handleSubmit(onSubmit)}>
					<S.InputWrap>
						<S.ItemWrap>
							<S.Mark>*</S.Mark>
							<span>비밀번호</span>
						</S.ItemWrap>
						<S.InputBoxWrap>
							<input
								{...register('password', FORM_TYPE.PASSWORD)}
								placeholder="특수문자, 영어, 숫자 포함 8자이상"
								type="password"
							/>
						</S.InputBoxWrap>
					</S.InputWrap>
					{errors.password && <S.Error>{errors.password.message}</S.Error>}
					<S.InputWrap>
						<S.ItemWrap>
							<S.Mark>*</S.Mark>
							<span>비밀번호 확인</span>
						</S.ItemWrap>
						<S.InputBoxWrap>
							<input
								{...register('confirmPW', {
									required: true,
									validate: value => {
										if (watch('password') !== value) {
											return '비밀번호가 일치하지 않습니다.';
										}
									},
								})}
								placeholder="PW check"
								type="password"
							/>
						</S.InputBoxWrap>
					</S.InputWrap>
					{errors.confirmPW && <S.Error>{errors.confirmPW.message}</S.Error>}
					<BtnWrap>
						<S.Button disabled={!full}>저장하기</S.Button>
					</BtnWrap>
				</S.Form>
			</S.Wrap>
		</S.Div>
	);
};

export default MyPasswordEdit;

const Div = styled.div`
	width: 100%;
	${flexAllCenter}
`;

const Wrap = styled.div`
	width: 60%;
	flex-direction: column;
	${flexAllCenter}
`;

const Header = styled.div`
	width: 100%;
	height: 150px;
	padding-top: 50px;
	margin-bottom: 30px;
	display: flex;
	justify-content: center;
`;

const LogoImage = styled.img`
	max-width: 100%;
	max-height: 100%;
`;

const Form = styled.form`
	border: 1px solid ${({ theme }) => theme.color.subBeige};
	border-radius: 10px;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	padding: 40px 30px;
	max-width: 700px;
	min-width: 600px;
	& > p {
		font-size: ${({ theme }) => theme.fontSize.lg};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
		margin-bottom: 20px;
	}
`;

const Button = styled.button`
	height: 40px;
	width: 82%;
	border-radius: 10px;
	border: none;
	margin-top: 20px;
	cursor: pointer;
	background: ${({ theme }) => theme.color.primary};
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	:disabled {
		background: ${({ theme }) => theme.color.gray};
	}
`;

const BtnWrap = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const ItemWrap = styled.div`
	display: flex;
	width: 20%;
	& > span {
		font-size: ${({ theme }) => theme.fontSize.base};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
`;

const InputBoxWrap = styled.div`
	${flexAlignCenter}
	width: 100%;
	& > input {
		width: 100%;
		height: 40px;
		border: 1px solid ${({ theme }) => theme.color.subBeige};
		border-radius: 10px;
		margin: 10px 0px;
		display: flex;
		padding: 20px;
		margin-left: 10px;
		padding-left: 10px;
	}

	& > button {
		width: 120px;
		height: 40px;
		border-radius: 10px;
		border: 1px solid ${({ theme }) => theme.color.primary};
		background: none;
		margin-left: 10px;
		cursor: pointer;
	}
`;
const InputWrap = styled.div`
	width: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
`;

const InputWrapBtn = styled.div`
	width: 100%;
	display: flex;
	justify-content: end;
	align-items: center;
`;

const Mark = styled.span`
	color: ${({ theme }) => theme.color.primary};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const Error = styled.div`
	font-size: ${({ theme }) => theme.fontSize.xs};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.primary};
`;

const Address = styled.div`
	display: flex;
	height: 40px;
	margin: 10px 0px;
	padding-left: 10px;
	margin-right: 5px;
	align-items: center;
`;

const S = {
	Div,
	Wrap,
	Header,
	LogoImage,
	Form,
	Button,
	InputWrap,
	InputWrapBtn,
	Mark,
	ItemWrap,
	InputBoxWrap,
	Error,
	Address,
};
