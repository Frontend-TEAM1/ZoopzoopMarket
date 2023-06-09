import dayjs from 'dayjs';
import styled from 'styled-components';

import { flexAllCenter } from 'Styles/common';

const MyMessage = ({ msg }) => {
	const createdAt = dayjs(msg.createdAt);
	const AMPM = createdAt.hour() >= 12 ? '오후' : '오전';

	return (
		<S.Wrapper>
			<div>
				<span>{AMPM}</span>
				<span>
					{createdAt.hour()}:{createdAt.minute()}
				</span>
			</div>
			<div>{msg.message}</div>
		</S.Wrapper>
	);
};

export default MyMessage;

const Wrapper = styled.div`
	${flexAllCenter}
	justify-content: right;
	margin: 5px 0;
	align-items: end;

	> div:first-child {
		font-size: ${({ theme }) => theme.fontSize.es};
		margin-right: 5px;
		> span {
			margin: 0 1px;
		}
	}

	> div:last-child {
		word-break: break-all;
		background-color: ${({ theme }) => theme.color.primary[100]};
		font-size: ${({ theme }) => theme.fontSize.xs};
		padding: 7px 15px;
		border-radius: 10px;
		line-height: 25px;
		max-width: 300px;
	}
	white-space: pre-wrap;
`;

const S = {
	Wrapper,
};
