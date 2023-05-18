import styled from 'styled-components';
import Preview from './Components/preview';
import SearchBar from 'Components/SearchBar/Desktop/SearchBar';
import RegisterBtn from 'Components/Buttons/RegisterBtn/RegisterBtn';
import { Link } from 'react-router-dom';
import TopBtn from 'Components/Buttons/TopBtn/TopBtn';
import CustomButton from 'Components/Buttons/button';

const DesktopMainPage = () => {
	return (
		<S.Wrapper>
			{/* 버튼 컴포넌트 확인 코드로 추후 삭제 예정 */}
            <CustomButton variant={'primary'} shape={'submitBtn'} size={'submitBtn'}>버튼 스타일 확인용</CustomButton> 
			<Link to={'/register'}>
				<S.BtnSection>
					<RegisterBtn />
				</S.BtnSection>
				<TopBtn />
			</Link>
			<S.SearchSection>
				<SearchBar />
			</S.SearchSection>
			<Preview category={0}></Preview>
			<Preview category={1}></Preview>
		</S.Wrapper>
	);
};

export default DesktopMainPage;

const Wrapper = styled.div`
	width: 60%;
	max-width: 1000px;
	min-width: 700px;
	margin: 0 auto;
	padding-top: 10px;
`;

const SearchSection = styled.div`
	width: 100%;
	border-top: 3px double ${({ theme }) => theme.color.subBeigeGreen};
	border-bottom: 3px double ${({ theme }) => theme.color.subBeigeGreen};
	padding: 40px 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const BtnSection = styled.div`
	width: 50px;
	height: 50px;
`;
const S = {
	Wrapper,
	SearchSection,
	BtnSection,
};
