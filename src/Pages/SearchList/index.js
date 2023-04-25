import ItemCard from 'Components/Card/Card';
import { useState } from 'react';
import styled from 'styled-components';

const SearchListPage = () => {
	const [selected, setSelected] = useState(null);

	let selectedItem = '';
	let searchKeyword = '';
	const itemList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	if (selected === 0) {
		selectedItem = '중고물품';
	} else if (selected === 1) {
		selectedItem = '무료나눔';
	}
	return (
		<S.Wrapper>
			<S.ResultText>
				찾으신 {selectedItem} '{searchKeyword}'에 대한 결과 입니다.(총
				{itemList.length} 개)
			</S.ResultText>
			<S.CategoryBox>
				<S.Category
					onClick={() => setSelected(0)}
					style={selected === 0 ? { fontWeight: 700 } : {}}
				>
					중고 물품
				</S.Category>
				<S.Wall></S.Wall>
				<S.Category
					onClick={() => setSelected(1)}
					style={selected === 1 ? { fontWeight: 700 } : {}}
				>
					무료 나눔
				</S.Category>
			</S.CategoryBox>
			<S.ItemList>
				{itemList.map(item => (
					<ItemCard key={item} />
				))}
			</S.ItemList>
		</S.Wrapper>
	);
};

export default SearchListPage;

const Wrapper = styled.div`
	width: 100%;
`;
const ResultText = styled.div`
	font-size: 16px;
	margin-top: 80px;
	margin-left: 5%;
`;
const CategoryBox = styled.div`
	cursor: pointer;
	display: flex;
	margin-top: 80px;
	margin-left: 7%;
	margin-bottom: 80px;
`;

const Category = styled.div`
	font-size: 28px;
`;
const Wall = styled.div`
	border-right: 1px solid black;
`;

const ItemList = styled.div`
	margin-left: 5%;
	width: 70%;
	display: flex;
	flex-wrap: wrap;
	margin-top: 80px;
	justify-content: center;

	> * {
		margin-left: 18px;
		margin-top: 18px;
		padding-left: 5%;
		margin: 18px auto;
	}
`;
const S = {
	Wrapper,
	ResultText,
	CategoryBox,
	Category,
	Wall,
	ItemList,
};
