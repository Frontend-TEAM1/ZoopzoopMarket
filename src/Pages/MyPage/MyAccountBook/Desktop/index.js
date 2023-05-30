import { useState } from 'react';
import styled from 'styled-components';
import AccountBookSelector from './Components/selector';
import AccountBookDetailInfo from './Components/detailInfo';
import { useQuery } from '@tanstack/react-query';
import MyPageApi from 'Apis/myPageApi';

const AccountBookPage = () => {
	const [date, setDate] = useState(new Date());
	const [category, setCategory] = useState('seller'); // params_category
	const [year, setYear] = useState(date.getFullYear());
	const [month, setMonth] = useState(date.getMonth() + 1);

	const specificMonth = new Date(year, month, 0);
	const lastDay = specificMonth.getDate();

	const monthFirstDate = `${year}-0${month}-01`; // params_start
	const monthLastDate = `${year}-0${month}-${lastDay}`; // params_end

	const { data } = useQuery(['accountBook', category], () =>
		MyPageApi.accountBook({
			page: 1,
			category,
			start: monthFirstDate,
			end: monthLastDate,
		}),
	);

	return (
		<S.Wrapper>
			<AccountBookSelector
				date={date}
				setDate={setDate}
				category={category}
				setCategory={setCategory}
				year={year}
				setYear={setYear}
				month={month}
				setMonth={setMonth}
			/>
			<AccountBookDetailInfo year={year} month={month} />
		</S.Wrapper>
	);
};

export default AccountBookPage;

const Wrapper = styled.div`
	margin: 0 auto;
	width: 70%;
	height: 100%;
	font-family: 'Nanum_extraBold';
	@media ${({ theme }) => theme.device.laptop} {
		width: 90%;
	}
	@media ${({ theme }) => theme.device.tablet} {
		width: 90%;
		display: inline;
	}
`;

const S = {
	Wrapper,
};
