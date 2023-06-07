import Calendar from 'react-calendar';

import dayjs from 'dayjs';
import styled from 'styled-components';

import { basicSetting, flexAlignCenter, flexAllCenter } from 'Styles/common';
import './styles.css';

const AccountBookDetailInfo = ({
	date,
	setDate,
	data,
	category,
	setYear,
	setMonth,
}) => {
	let saleDateArr = [];

	data &&
		data.payList.map(item => {
			const saleDate = item.createdAt;
			saleDateArr.push(saleDate.split('T')[0]);
		});

	return (
		<S.Wrap>
			<S.infoTitle>지금까지 줍줍마켓과 함께한 내역이에요 !</S.infoTitle>
			<S.PreviewWrap>
				<div>
					<S.Flex>
						<div>총 수입총액</div>
						<div>
							{data && (
								<S.Amount>
									{data.amount.totalSaleAmount === null
										? 0
										: parseInt(data.amount.totalSaleAmount).toLocaleString(
												'ko-KR',
										  )}
								</S.Amount>
							)}
							원
						</div>
					</S.Flex>
					<S.Flex>
						<div>총 지출총액</div>
						<div>
							{data && (
								<S.Amount>
									{data.amount.totalPurchaseAmount === null
										? 0
										: parseInt(data.amount.totalPurchaseAmount).toLocaleString(
												'ko-KR',
										  )}
								</S.Amount>
							)}
							원
						</div>
					</S.Flex>
					<S.Flex2>
						<div>총 수익</div>
						{data && (
							<div>
								<S.Amount>
									{parseInt(
										data.amount.totalSaleAmount -
											data.amount.totalPurchaseAmount,
									).toLocaleString('ko-KR')}
								</S.Amount>
								원
							</div>
						)}
					</S.Flex2>
				</div>
			</S.PreviewWrap>

			<S.infoTitle>이번달 줍줍마켓과 함께한 내역이에요 !</S.infoTitle>
			<S.PreviewWrap>
				<div>
					<S.Flex>
						<div>이번달 수입</div>
						<div>
							{data && (
								<S.Amount>
									{data.amount.thisMonthSaleAmount === null
										? 0
										: parseInt(data.amount.thisMonthSaleAmount).toLocaleString(
												'ko-KR',
										  )}
								</S.Amount>
							)}
							원
						</div>
					</S.Flex>
					<S.Flex>
						<div>이번달 지출</div>
						<div>
							{data && (
								<S.Amount>
									{data.amount.thisMonthPurchaseAmount === null
										? 0
										: parseInt(
												data.amount.thisMonthPurchaseAmount,
										  ).toLocaleString('ko-KR')}
								</S.Amount>
							)}
							원
						</div>
					</S.Flex>
					<S.Flex2>
						<div>총 수익</div>
						<div>
							{data && (
								<S.Amount>
									{parseInt(
										data.amount.thisMonthSaleAmount -
											data.amount.thisMonthPurchaseAmount,
									).toLocaleString('ko-KR')}
								</S.Amount>
							)}
							원
						</div>
					</S.Flex2>
				</div>
			</S.PreviewWrap>

			<Calendar
				value={date}
				onChange={setDate}
				className="react-calendar"
				formatDay={(locale, date) => dayjs(date).format('D')}
				tileContent={({ date }) => {
					if (
						saleDateArr.find(day => day === dayjs(date).format('YYYY-MM-DD'))
					) {
						return (
							<S.ActionCount>
								<S.Dot whichCategory={category === 'seller'}></S.Dot>
								<S.Category whichCategory={category === 'seller'}>{category === 'seller' ? '판매' : '구매'}</S.Category>
							</S.ActionCount>
						);
					} else {
						return <S.WhiteBox>{'0'}</S.WhiteBox>;
					}
				}}
				onDrillDown={e => {
					console.log(e);
					setMonth(`0${e.activeStartDate.getMonth() + 1}`);
					setYear(e.activeStartDate.getFullYear());
				}}
				onActiveStartDateChange={e => {
					if (e.action === 'next' || e.action === 'prev') {
						setMonth(`0${e.activeStartDate.getMonth() + 1}`);
					} else if (e.action === 'next2' || e.action === 'prev2') {
						console.log(e);
						setYear(e.activeStartDate.getFullYear());
					}
				}}
			/>
		</S.Wrap>
	);
};

export default AccountBookDetailInfo;

const Wrap = styled.div`
	${basicSetting}
`;

const infoTitle = styled.div`
	width: 80%;
	margin: 0 auto 10px;
`;

const PreviewWrap = styled.div`
	width: 80%;
	height: 28vh;
	margin: 0 auto 30px;
	padding: 30px 20px 20px;
	box-shadow: 0px 0px 20px #e0e0e0;

	> div:nth-child(2) {
		${flexAlignCenter}
		margin-bottom: 30px;
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}

	@media ${({ theme }) => theme.device.tablet} {
		width: 90%;
	}
	@media ${({ theme }) => theme.device.mobile} {
		width: 100%;
	}
`;

const Flex = styled.div`
	display: flex;
	margin: 1.3rem auto;
	width: 50%;
	justify-content: space-between;
`;

const Flex2 = styled.div`
	display: flex;
	margin: 1.3rem auto 1.3rem;
	width: 50%;
	justify-content: space-between;
	border-top: solid 2px ${({ theme }) => theme.color.gray[200]};
	padding-top: 1rem;
`;

const Amount = styled.span`
	color: ${({ theme }) => theme.color.primary[300]};
	font-weight: ${({ theme }) => theme.fontWeight.bolder};
`;

const ActionCount = styled.div`
	${flexAllCenter}
	font-size: 18px;
`;

const Dot = styled.div`
	margin-right: 2px;
	background-color: ${({ whichCategory }) =>
		whichCategory ? '#f87171' : 'skyblue'};
	width: 8px;
	height: 8px;
	display: flex;
	justify-content: center;
	border-radius: 50%;
	display: flex;
`;

const Category = styled.div`
	color: ${({ whichCategory }) =>
	whichCategory ? '#f87171' : 'skyblue'};
	@media ${({ theme }) => theme.device.tablet} {
		font-size: ${({theme}) => theme.fontSize.sm};
	}
	@media ${({ theme }) => theme.device.mobile} {
		width: 90%;
		font-size: ${({theme}) => theme.fontSize.sm};
	}
`;

const WhiteBox = styled.div`
	color: white;
	@media ${({ theme }) => theme.device.tablet} {
		font-size: ${({theme}) => theme.fontSize.sm};
	}
	@media ${({ theme }) => theme.device.mobile} {
		width: 90%;
		font-size: ${({theme}) => theme.fontSize.sm};
	}
`;

const S = {
	Wrap,
	infoTitle,
	PreviewWrap,
	Flex,
	Flex2,
	Amount,
	ActionCount,
	Dot,
	Category,
	WhiteBox,
};
