import { Axios } from 'Apis/@core';
import HeartBtn from 'Components/Buttons/HeartBtn/HeartBtn';
import { flexAllCenter } from 'Styles/common';
import { isDesktop } from 'react-device-detect';
import { io } from 'socket.io-client';
import styled from 'styled-components';

const DetailContent = ({ state }) => {
	// const userSocket = useRecoilValue(userSocketAtom);
	// console.log(userSocket);
	const onClickChatBtn = async () => {
		const so = io.connect(process.env.REACT_APP_BACKEND_URL);

		const room_idx = 5;
		so.emit('join', { room_idx });

		const msg = {
			title: '타이틀',
			createdAt: '222222',
			prod_idx: 1,
			room_idx: 2,
			nickName: '닉네임',
			message: '안녕하세요',
			socketId: 'b60e085f-ad17-4d88-87b7-9e870828b3bd',
		};

		so.emit('sendMessage', msg);
		// so.on('receiveMessage', msg);
		// const message = '안녕';

		// try {
		// 	const res = await Axios.post('/api/chat/send', { room_idx, message });
		// 	console.log(res.data);
		// } catch (err) {
		// 	console.log(err);
		// }

		try {
			const res = await Axios.get(`/api/chat/chat-log?room_idx=${room_idx}`);
			console.log('/////로그 조회', res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{state ? (
				<S.BuyerWrapper isDesktop={isDesktop}>
					<div>#제목 : 브라운 그레이 자켓 팝니다.</div>
					<div># 카테고리(여성의류) | 2일전</div>
					<div>120,000 원</div>
					<div>
						본문내용 : 택도 제거 안한 새 제품입니다! 직거래와 택배 모두
						가능합니다.
					</div>
					<div>
						<div onClick={onClickChatBtn}>채팅하기</div>
						<div>
							<HeartBtn />
						</div>
					</div>
				</S.BuyerWrapper>
			) : (
				<S.SellerWrapper isDesktop={isDesktop}>
					<div>
						<div>#제목 : 브라운 그레이 자켓 팝니다.</div>
						<div>
							<HeartBtn />
						</div>
					</div>
					<div># 카테고리(여성의류) | 2일전</div>
					<div>120,000 원</div>
					<div>
						본문내용 : 택도 제거 안한 새 제품입니다! 직거래와 택배 모두
						가능합니다.
					</div>
				</S.SellerWrapper>
			)}
		</>
	);
};

export default DetailContent;
const BuyerWrapper = styled.div`
	margin: 20px 20px;
	& > div {
		margin: 20px 0;
	}
	& > div:nth-of-type(1) {
		font-size: ${({ theme }) => theme.fontSize.big};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
	& > div:nth-of-type(3) {
		font-size: ${({ theme }) => theme.fontSize.md};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
	& > div:nth-of-type(4) {
		font-size: ${({ theme }) => theme.fontSize.base};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
	& > div:nth-of-type(5) {
		${flexAllCenter}
		justify-content: space-between;
		margin: 40px 0;
		& > div:first-child {
			background-color: #b9b9b9;
			padding: 15px 30px;
			border-radius: 10px;
		}
		& > div:last-child {
			width: 40px;
			height: 40px;
		}
	}
`;

const SellerWrapper = styled.div`
	margin: 20px 20px;
	& > div {
		margin: 20px 0;
	}
	& > div:nth-of-type(1) {
		font-size: ${({ theme }) => theme.fontSize.big};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
		${flexAllCenter}
		justify-content: space-between;
		& > div:last-child {
			width: 40px;
			height: 40px;
		}
	}
	& > div:nth-of-type(3) {
		font-size: ${({ theme }) => theme.fontSize.md};
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}
	& > div:nth-of-type(4) {
		font-size: ${({ theme }) => theme.fontSize.base};
		font-weight: ${({ theme }) => theme.fontWeight.regular};
	}
	& > div:nth-of-type(5) {
		${flexAllCenter}
		justify-content: space-between;
		& > div {
			background-color: #b9b9b9;
			padding: 20px;
			border-radius: 20px;
		}
	}
`;

const S = {
	BuyerWrapper,
	SellerWrapper,
};
