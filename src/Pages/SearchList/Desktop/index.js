import SearchBar from 'Components/SearchBar/Desktop/SearchBar';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchList from './searchList';
import { useInfiniteSearch } from 'Hooks/Queries/get-infinite-search';

const DesktopSearchList = () => {
	const [selected, setSelected] = useState(0);
	const { word } = useParams();
	const [ref, inView] = useInView({ threshold: 0.5 });
	const props = 'search_list';

	const res = useInfiniteSearch(word, selected);
	const { data } = res;

	let selectedItem = '';

	if (selected === 0) {
		selectedItem = '중고물품';
	} else if (selected === 1) {
		selectedItem = '무료나눔';
	}

	useEffect(() => {
		res.refetch();
	}, [selected]);

	useEffect(() => {
		if (!inView) {
			return;
		}
		res.fetchNextPage();
	}, [inView]);

	return (
		<>
			<S.Wrapper>
				<S.Container>
					<S.SearchBarContainer>
						<SearchBar props={props} />
					</S.SearchBarContainer>
					{data && (
						<S.ResultText>
							{data.pages && data.pages[0].data.product.length === 0 ? (
								<div>{word}에 대한 검색 결과가 없습니다.</div>
							) : (
								<div>
									찾으신 '{word}'에 대한 결과 입니다.(총{} 개)
								</div>
							)}
						</S.ResultText>
					)}
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
						{data &&
							data.pages.map(pageItems => (
								<SearchList products={pageItems.data.product} />
							))}
						<S.refDiv ref={ref}></S.refDiv>
					</S.ItemList>
				</S.Container>
			</S.Wrapper>
		</>
	);
};

export default DesktopSearchList;

const refDiv = styled.div`
	border: 4px solid red;
`;

const Wrapper = styled.div`
	width: 60%;
	max-width: 1000px;
	min-width: 700px;
	margin: 0 auto;
`;

const Container = styled.div`
	margin: 0 auto;
`;

const SearchBarContainer = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 40px;
`;

const ResultText = styled.div`
	font-size: ${({ theme }) => theme.fontSize.base};
	margin-top: 40px;
`;

const CategoryBox = styled.div`
	cursor: pointer;
	display: flex;
	margin-top: 40px;
`;

const Category = styled.div`
	font-size: ${({ theme }) => theme.fontSize.base};
`;

const Wall = styled.div`
	border-right: 1px solid black;
	border-color: ${({ theme }) => theme.color.primary};
	margin: 0 15px;
`;

const ItemList = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 30px;
`;
const SampleCard = styled.div`
	width: 200px;
	height: 400px;
	border: 1px solid black;
`;

const S = {
	Wrapper,
	Container,
	ResultText,
	CategoryBox,
	Category,
	Wall,
	ItemList,
	SearchBarContainer,
	SampleCard,
	refDiv,
};
