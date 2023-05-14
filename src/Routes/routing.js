import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../Pages/Landing';
import ChattingPage from '../Pages/Chat';
import FormPage from '../Pages/Form';
import MarketPricePage from '../Pages/MarketPrice';
import MyPage from '../Pages/MyPage';
import MyItemPage from '../Pages/MyPage/MyItem/Desktop/myItem';
import SearchListPage from '../Pages/SearchList';
import LayOut from '../Components/Layout';
import LoginPage from 'Pages/Form/Login/Desktop/LoginPage';
import SignUpPage from 'Pages/Form/SignUp/Desktop/SignUpPage';
import ItemDetailPage from 'Pages/ItemDetail';
import RegisterPage from 'Pages/Register/Desktop';
import MyInterestPage from 'Pages/MyPage/MyInterest/Desktop/myInterest';
import ErrorPage from 'Error';
import AccountBookPage from 'Pages/MyPage/MyAccountBook/Desktop';
import MainPage from 'Pages/Main';
import ReviewPage from 'Pages/Review';
import YourProfile from 'Pages/YourProfile/Desktop';
import PrivateRoute from './private';
import MyUserEdit2 from 'Pages/MyPage/MyUserEdit2/myUserEdit2';
import MyPasswordEdit from 'Pages/MyPage/MyPasswordEdit/myPasswordEdit';

const router = createBrowserRouter([
	{
		path: '',
		element: <LandingPage />,
	},

	{
		path: 'form/login',
		element: <LoginPage />,
	},
	{
		path: 'form/signup',
		element: <SignUpPage />,
	},

	{
		element: (
			<PrivateRoute>
				<LayOut />
			</PrivateRoute>
		),
		children: [
			{
				path: 'chat',
				element: <ChattingPage />,
			},
			{
				path: 'form',
				element: <FormPage />,
			},
			{
				path: 'item_detail/:idx',
				element: <ItemDetailPage />,
			},
			{
				path: 'landing',
				element: <LandingPage />,
			},
			{
				path: 'main',
				element: <MainPage />,
			},
			{
				path: 'market_price/:word',
				element: <MarketPricePage />,
			},
			{
				path: 'market_price',
				element: <MarketPricePage />,
			},
			{
				path: '/mypage',
				element: <MyPage />,
				children: [
					{
						path: '/mypage/item',
						element: <MyItemPage />,
					},
					{
						path: '/mypage/account_book',
						element: <AccountBookPage />,
					},
					{
						path: '/mypage/interest',
						element: <MyInterestPage />,
					},
					{
						path: '/mypage/user_edit',
						element: <MyUserEdit2 />,
					},
					{
						path: '/mypage/user_password_edit',
						element: <MyPasswordEdit/>
					}
				],
			},
			{
				path: 'profile',
				element: <YourProfile />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'register/:idx',
				element: <RegisterPage />,
			},
			{
				path: 'search_list/:word',
				element: <SearchListPage />,
			},
			{
				path: 'review',
				element: <ReviewPage />,
			},
		],
	},
	{
		path: '*',
		element: <ErrorPage />,
	},
]);

export default router;
