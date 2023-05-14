const { default: ProductApi } = require('Apis/productApi');
const { useInfiniteQuery } = require('react-query');

export const useInfiniteSearch = (word, selected) => {
	const res = useInfiniteQuery(
		['SEARCH_ITEMS', word],
		({ pageParam = 1 }) => ProductApi.searchItems(pageParam, word, selected),
		{
			getNextPageParam: lastPage => {
				let page =
					lastPage.data.pagination.no === 0
						? 1
						: Math.floor(lastPage.data.pagination.no / 20) + 1;
				if (page < lastPage.data.pagination.endPage) {
					return page + 1;
				} else {
					return undefined;
				}
			},
		},
	);
	return res;
};

/*
word를 기반으로 캐싱되며, 같은 검색어로 요청이 이루어지면 캐시된 결과가 반환됩니다.


리턴되는 res의 data를 console.log를 해보면 data는 pages와 pageParams로 이루어져 있습니다.
 이 pages(배열)안에 각 항목마다  data라는 객체가 있습니다. (ex: data.pages[0].data)

이 pages안에 있는 data안에는 pagination객체와 product배열이 있습니다.  (ex: data.pages[0].data.product)
pagination은 startPage, endPage, totalPage, no, page_size ,totalPage,totalSet 으로 이루어져 있습니다.
(ex: data.pages[0].data.pagination.no)

no를 제외한 나머지 키값은 검색요청을 한 시점에서 고정된 값입니다.(ex: 데이터를 받아오면 시작과 끝페이지는 정해지고, 총 페이지는 정해지므로.)
그래서 no값을 사용해서 searchItems의 pageParam으로 전달했습니다.

하지만 no값은 첫 페이지의 0 다음부터느 20의 배수여서 20으로 나눠서 +1을 해주는 작업을 했습니다.
(pageParam으로 20씩 넘기면 +1된 페이지 번호가 아닌 20씩 증가된 페이지번호를 넘겨버리기 떄문)

그래서 searchItem를 넘기기전에 page변수를 따로 선언해서 return했습니다.

 */
