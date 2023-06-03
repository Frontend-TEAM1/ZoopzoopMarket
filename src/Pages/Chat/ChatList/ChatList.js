import ChatMessage from 'Components/ChatMessage/ChatMessage';

import styled from 'styled-components';

import { flexAllCenter } from 'Styles/common';

const ChatList = ({ chatroomList, setChatroomIdx, idx, item, setItemInfo }) => {
	return (
		<>
			<S.LeftUpperBar>
				<span>채팅목록</span>
			</S.LeftUpperBar>
			<S.ListContainer>
				{idx &&
					chatroomList &&
					chatroomList.map(chat => {
						return (
							<ChatMessage
								chat={chat}
								setChatroomIdx={setChatroomIdx}
								item={item}
								setItemInfo={setItemInfo}
							/>
						);
					})}
				{!idx &&
					chatroomList &&
					chatroomList.chats.map(chat => {
						return (
							<ChatMessage
								chat={chat}
								setChatroomIdx={setChatroomIdx}
								item={item}
								setItemInfo={setItemInfo}
							/>
						);
					})}
			</S.ListContainer>
		</>
	);
};

export default ChatList;

const LeftUpperBar = styled.div`
	${flexAllCenter}
	height: 10%;
	background-color: ${({ theme }) => theme.color.primary[400]};
	color: white;
	cursor: pointer;
	border-radius: 5px 0 0 0;
	padding: 2rem;
`;

const ListContainer = styled.div`
	height: 90%;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	::-webkit-scrollbar {
		width: 8px;
		background-color: #f5f5f5;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: #aaa;
		&:hover {
			background-color: #999;
		}
	}
`;

const S = {
	LeftUpperBar,
	ListContainer,
};
