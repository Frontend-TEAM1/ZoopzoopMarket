import SearchList from './searchList';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UsedProduct = ({ word, data }) => {
	const navigate = useNavigate();

	const goWholeItem = () => {
		navigate(`${0}`, { state: data });
	};

	return (
		<S.Wrapper>
			{data && data.slice(0, 10).map(data => <SearchList products={data} />)}
			<S.Container>
				<S.Buttons onClick={goWholeItem}>중고 아이템 전체 보기</S.Buttons>
			</S.Container>
		</S.Wrapper>
	);
};
export default UsedProduct;
const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	border: 10px solid beige;
	justify-content: space-around;
`;
const Container = styled.div`
	display: flex;
	width: 100%;
	border: 1px solid black;
	justify-content: center;
	margin-top: 30px;
`;
const Buttons = styled.button`
	border: 1px solid slateblue;
`;

const S = {
	Wrapper,
	Container,
	Buttons,
};
