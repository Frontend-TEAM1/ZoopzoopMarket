import { createBrowserRouter } from 'react-router-dom';
import MobileMarketPrice from '../Pages/MarketPrice/Mobile';
import MyPage from '../Pages/MyPage';
import MobileMyItemPage from '../Pages/MyPage/MyItem/Mobile/mobileMyItem';
import MobileSearchList from '../Pages/SearchList/Mobile';
import LayOut from '../Components/Layout';
import MobileItemDetailPage from 'Pages/ItemDetail/Mobile';
import MobileLandingPage from 'Pages/Landing/Mobile';
import MobileChattingPage from 'Pages/Chat/Mobile/MobileChattingPage';
import MobileChatDetail from 'Pages/Chat/Mobile/MobileChatDetail';
import MobileMyInterestPage from 'Pages/MyPage/MyInterest/Mobile/mobileMyInterest';
import ErrorPage from 'Error';
import MobileAccountBookPage from 'Pages/MyPage/MyAccountBook/Mobile';
import ReviewPage from 'Pages/Review';
import MobileLoginPage from 'Pages/Form/Login/Mobile/MobileLoginPage';
import MobileMain from 'Pages/Main/Mobile';
import MobileRegisterPage from 'Pages/Register/Mobile';
import MobileSignUpPage from 'Pages/Form/SignUp/Mobile/MobileSignUpPage';

const m_router = createBrowserRouter([
	{
		path: '',
		element: <MobileLandingPage />,
	},
	{
		path: 'form/login',
		element: <MobileLoginPage />,
	},
	{
		path: 'form/signup',
		element: <MobileSignUpPage />,
	},
	{
		element: <LayOut />,
		children: [
			{
				path: 'chat',
				element: <MobileChattingPage />,
			},

			{
				path: 'chat/:id',
				element: <MobileChatDetail />,
			},
			// {
			// 	path: 'form',
			// 	element: <FormPage />,
			// },
			{
				path: 'item_detail',
				element: <MobileItemDetailPage />,
			},
			// {
			// 	path: 'landing',
			// 	element: <LandingPage />,
			// },
			{
				path: 'main',
				element: <MobileMain />,
			},
			{
				path: 'market_price',
				element: <MobileMarketPrice />,
			},
			{
				path: 'mypage',
				element: <MyPage />, //수정 필요
			},
			{
				path: 'mypage/account_book',
				element: <MobileAccountBookPage />,
			},
			{
				path: 'mypage/interest',
				element: <MobileMyInterestPage />,
			},
			{
				path: 'mypage/item',
				element: <MobileMyItemPage />,
			},
			{
				path: 'mypage/user_edit',
				// element: <MobileMyUserEdit2 />, //수정 필요
			},
			{
				path: 'register',
				element: <MobileRegisterPage />,
			},
			{
				path: 'search_list',
				element: <MobileSearchList />,
			},
			{
				path: 'review',
				element: <ReviewPage />, //수정 필요
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default m_router;
