import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';

import ProductApi from 'Apis/productApi';

import UploadFiles from './Components/uploadFiles';
import FindAddress from 'Components/Address/address';
import KaMap from 'Components/Map/Map';
import AlertModal from 'Components/Alert/alertModal';
import CategorySelector from './Components/categorySelector';

import styled from 'styled-components';

import { basicSetting, flexAlignCenter } from 'Styles/common';

const RegisterPage = () => {
	const [searchResult, setSearchResult] = useState('');
	const [images, setImages] = useState([]);
	const [price, setPrice] = useState('');
	const [formattedPrice, setFormattedPrice] = useState('');
	const [tags, setTags] = useState([]);
	const [addressMessage, setAddressMessage] = useState();

	const [modal, setModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [regiModal, setRegiModal] = useState(false);

	const { showBoundary } = useErrorBoundary();

	const { idx } = useParams();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		formState: { errors },
	} = useForm();

	const productIdx = async () => {
		try {
			const res = await ProductApi.detail(idx);
			setValue('price', res.data.searchProduct.price);
			setPrice(res.data.searchProduct.price);
			setFormattedPrice(res.data.searchProduct.price.toLocaleString());
			setTags(
				res.data.searchProduct.ProductsTags.map(tagObj => tagObj.Tag.tag),
			);
			setValue('title', res.data.searchProduct.title);
			setValue('content', res.data.searchProduct.description);
			setSearchResult(res.data.searchProduct.region);
			setImages([
				res.data.searchProduct.img_url,
				...res.data.searchProduct.ProductImages.map(subImg => subImg.img_url),
			]);
		} catch (error) {
			showBoundary(error);
		}
	};

	useEffect(() => {
		if (!idx) return;
		productIdx();
	}, [idx]);

	const handleKeyDown = e => {
		if (e.keyCode === 13) {
			clearErrors('tag');
			e.preventDefault();
			const newTag = e.target.value.trim();
			const check = tags.filter(tag => tag === newTag);

			if (newTag && check.length === 0) {
				setTags([...tags, newTag]);
				e.target.value = '';
			} else e.target.value = '';
		}
	};

	const handleDelete = deleteTag => e => {
		e.preventDefault();
		setTags(prevTags => prevTags.filter(tag => tag !== deleteTag));
	};

	const handlePriceChange = e => {
		const value = e.target.value;
		const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
		const priceValue = isNaN(num) ? 0 : num;
		const formattedPrice = priceValue.toLocaleString();
		setPrice(priceValue);
		setFormattedPrice(formattedPrice);
	};

	const mutationPost = useMutation(data => {
		return ProductApi.registerPost(data);
	});

	const mutationEdit = useMutation(data => {
		return ProductApi.editPost(data);
	});

	useEffect(() => {
		setAddressMessage('');
	}, [searchResult]);

	useEffect(() => {
		clearErrors('tag');
	}, [tags]);

	const onSubmit = data => {
		if (tags.length === 0) {
			window.scrollTo(200, 200);
			return setError('tag', { message: '1개이상 꼭 입력해주세요.' });
		}

		if (!searchResult) {
			window.scrollTo(500, 500);
			return setAddressMessage('거래장소를 입력해주세요');
		}

		try {
			const formData = new FormData();
			formData.append('title', data.title);
			formData.append('price', price);
			formData.append('category', Number(data.price) === 0 ? 1 : 0);
			formData.append('description', data.content);
			formData.append('region', searchResult);
			formData.append('tag', tags);
			[...data.mainImg].forEach(element => {
				formData.append('images', element);
			});

			if (!idx) {
				if (data.mainImg.length == 0) {
					window.scrollTo(0, 0);
					return setShowModal(true);
				}
				mutationPost.mutate(formData, {
					onSuccess: () => {
						queryClient.invalidateQueries(['mainList']);
						setModal(true);
					},
				});
			} else {
				formData.append('idx', idx);
				const imgUrls = [];
				images.forEach((element, index) => {
					if (index === 0) {
						formData.append('main_url', element);
					} else {
						imgUrls.push(element);
					}
				});
				formData.append('img_url', imgUrls.join());
				mutationEdit.mutate(formData, {
					onSuccess: () => {
						queryClient.invalidateQueries(['mainList']);
						setRegiModal(true);
					},
				});
			}
		} catch (error) {
			showBoundary(error);
		}
	};

	return (
		<S.Wrapper onSubmit={handleSubmit(onSubmit)}>
			<UploadFiles register={register} images={images} setImages={setImages} />
			<S.Blank></S.Blank>
			<S.Line>
				<S.Mark>*</S.Mark>
				<S.Title>제목</S.Title>
				<S.InputContainer>
					<S.InputBox
						placeholder="최대 20자까지 입력 가능합니다."
						maxLength={19}
						{...register('title', {
							required: '제목은 필수 사항입니다.',
						})}
						onKeyDown={e => {
							if (e.key == 'Enter') e.preventDefault();
						}}
					></S.InputBox>
					{errors.title && (
						<S.Error role="alert">{errors.title.message}</S.Error>
					)}
				</S.InputContainer>
			</S.Line>
			<S.Line>
				<S.Mark>*</S.Mark>
				<S.Title>가격</S.Title>
				<S.InputContainer>
					<S.InputBox
						placeholder="0원 기입시 무료 나눔템으로 분류됩니다."
						{...register('price', {
							required: '가격은 필수 사항입니다.',
							pattern: {
								value: /^[0-9,]+$/,
								message: '숫자만 입력해주세요',
							},
						})}
						value={formattedPrice}
						type="text"
						onChange={handlePriceChange}
					></S.InputBox>
					{errors.price && (
						<S.Error role="alert">{errors.price.message}</S.Error>
					)}
				</S.InputContainer>
			</S.Line>
			<S.Line>
				<S.Mark>*</S.Mark>
				<S.Title>태그</S.Title>
				<S.InputContainer>
					<S.InputBox
						placeholder="이곳에 입력 후 엔터를 치면 태그가 등록됩니다."
						onKeyDown={handleKeyDown}
					></S.InputBox>
					{errors.tag && <S.Error role="alert">{errors.tag.message}</S.Error>}
					<S.SelectorWrapper>
						<CategorySelector setTags={setTags} tags={tags}></CategorySelector>
					</S.SelectorWrapper>
				</S.InputContainer>
			</S.Line>
			<S.TagWrapper>
				{tags &&
					tags.map((tag, index) => (
						<S.TagBox key={index}>
							<S.TagContent>{tag}</S.TagContent>
							<S.DelTag onClick={e => handleDelete(tag)(e)}>x</S.DelTag>
						</S.TagBox>
					))}
			</S.TagWrapper>
			<S.AddressWrapper>
				<S.AddressTitleContainer>
					<S.Mark>*</S.Mark>
					<S.Title>거래장소</S.Title>
					<S.Address>
						{searchResult}
						{addressMessage && (
							<S.AddressError>{addressMessage}</S.AddressError>
						)}
					</S.Address>
					<FindAddress setter={setSearchResult} />
				</S.AddressTitleContainer>
				<KaMap address={searchResult} />
			</S.AddressWrapper>
			<S.Line>
				<S.Mark>*</S.Mark>
				<S.Title>본문 내용</S.Title>
				<S.InputContainer>
					{errors.content && (
						<S.Error role="alert" style={{ left: '20px', top: '-10px' }}>
							{errors.content.message}
						</S.Error>
					)}
				</S.InputContainer>
			</S.Line>
			<S.ContentBox>
				<S.TxtArea
					placeholder="본문 내용을 입력해주세요."
					{...register('content', {
						required: '본문 내용은 필수 사항입니다.',
					})}
				></S.TxtArea>
			</S.ContentBox>
			<S.Container>
				<S.RegisterBtn>등록하기</S.RegisterBtn>
				{showModal && <AlertModal content={'이미지를 등록해주세요'} />}
			</S.Container>
			{modal && (
				<AlertModal content={'물품등록이 완료되었습니다.'} props={'/main'} />
			)}
			{regiModal && (
				<AlertModal
					content={'물품수정이 완료되었습니다.'}
					props={`/item_detail/${idx}`}
				/>
			)}
		</S.Wrapper>
	);
};

export default RegisterPage;

const Wrapper = styled.form`
	${basicSetting}
`;

const Blank = styled.div`
	width: 100%;
	height: 20px;
`;

const Line = styled.div`
	width: 100%;
	${flexAlignCenter}
	padding: 0 10px 30px 10px;
	position: relative;
	margin: 0 auto;
`;

const Mark = styled.span`
	position: absolute;
	color: ${({ theme }) => theme.color.primary[400]};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	top: 0;
	left: 0;
`;

const Title = styled.span`
	width: 105px;
	font-size: ${({ theme }) => theme.fontSize.md};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	@media (max-width: 1100px) {
		font-size: ${({ theme }) => theme.fontSize.base};
	}
	@media screen and (max-width: 768px) {
		min-width: 30px;
		font-size: ${({ theme }) => theme.fontSize.sm};
	}
`;

const InputContainer = styled.div`
	width: 100%;
	position: relative;
`;

const InputBox = styled.input`
	width: 100%;
	min-width: 300px;
	max-width: 1200px;
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.color.gray[200]};
	padding: 10px;
	font-size: ${({ theme }) => theme.fontSize.md};
	:focus {
		outline: none;
	}

	@media (max-width: 1100px) {
		font-size: ${({ theme }) => theme.fontSize.base};
	}
	@media screen and (max-width: 768px) {
		font-size: ${({ theme }) => theme.fontSize.sm};
	}
`;

const SelectorWrapper = styled.div`
	width: 100%;
`;

const TagWrapper = styled.div`
	width: 90%;
	${flexAlignCenter}
	flex-wrap: wrap;
	padding: 0 10px;
	margin-left: 100px;
	margin-bottom: 50px;

	@media (max-width: 1100px) {
		margin-left: 100px;
		margin-bottom: 20px;
		margin-top: -10px;
	}
	@media (max-width: 768px) {
		margin-left: 95px;
		margin-bottom: 20px;
		margin-top: -15px;
	}
`;

const TagBox = styled.span`
	display: flex;
	max-width: 150px;
	padding: 5px;
	margin-right: 10px;
	margin-bottom: 10px;
	background-color: ${({ theme }) => theme.color.gray[100]};
`;

const TagContent = styled.span`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	float: right;
	@media (max-width: 768px) {
		font-size: ${({ theme }) => theme.fontSize.sm};
	}
`;

const DelTag = styled.button`
	width: 20px;
	border: none;
	background: none;
	display: flex;
	align-items: flex-end;
	line-height: 14px;
	:hover {
		font-weight: ${({ theme }) => theme.fontWeight.bold};
	}

	@media (max-width: 768px) {
		width: 15px;
	}
`;

const AddressWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 10px 30px 10px;
	position: relative;
	margin: 0 auto;
`;

const AddressTitleContainer = styled.div`
	width: 100%;
	${flexAlignCenter}
	margin-bottom: 10px;
	justify-content: space-between;
`;

const Address = styled.div`
	width: 100%;
	padding: 10px;
	font-size: ${({ theme }) => theme.fontSize.md};
	position: relative;
	@media (max-width: 768px) {
		font-size: ${({ theme }) => theme.fontSize.sm};
	}
`;

const Error = styled.div`
	font-size: ${({ theme }) => theme.fontSize.xs};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.error};
	margin-left: 30px;
	margin-top: 5px;
	position: absolute;
	right: 50px;
	top: 10px;
	@media (max-width: 1100px) {
		right: 50px;
		top: 10px;
	}
	@media (max-width: 768px) {
		left: -20px;
		top: 40px;
	}
`;

const AddressError = styled.div`
	font-size: ${({ theme }) => theme.fontSize.xs};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	color: ${({ theme }) => theme.color.error};
	margin-left: 30px;
	margin-top: 5px;
	position: absolute;
	top: 0;
	left: 0;
	@media (max-width: 1100px) {
		right: 50px;
		top: 10px;
	}
	@media (max-width: 768px) {
		left: -20px;
		top: 40px;
	}
`;

const ContentBox = styled.div`
	width: 100%;
	${flexAlignCenter}
	flex-direction: column;
	padding: 0 10px 30px 10px;
	position: relative;
	margin: 0 auto;
	@media (max-width: 768px) {
		padding: 0 10px 10px 10px;
	}
`;

const TxtArea = styled.textarea`
	width: 100%;
	margin-top: -15px;
	height: 400px;
	font-size: ${({ theme }) => theme.fontSize.base};
	padding: 20px;
	:focus {
		outline: none;
	}

	@media (max-width: 768px) {
		font-size: ${({ theme }) => theme.fontSize.sm};
		height: 250px;
	}
`;

const Container = styled.div`
	width: 100%;
	margin: 0 auto;
	padding: 10px;
	display: flex;
`;

const RegisterBtn = styled.button`
	width: 150px;
	height: 50px;
	border: none;
	background: ${({ theme }) => theme.color.primary[200]};
	border-radius: 5px;
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.fontSize.base};
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	margin-left: auto;
	margin-bottom: 50px;
	cursor: pointer;
	:hover {
		background-color: ${({ theme }) => theme.color.primary[400]};
	}

	@media (max-width: 768px) {
		width: 110px;
		height: 30px;
		font-size: ${({ theme }) => theme.fontSize.sm};
	}
`;

const S = {
	Wrapper,
	Blank,
	Line,
	Mark,
	Title,
	InputContainer,
	InputBox,
	SelectorWrapper,
	TagWrapper,
	TagBox,
	TagContent,
	DelTag,
	AddressWrapper,
	AddressTitleContainer,
	Address,
	Error,
	AddressError,
	ContentBox,
	TxtArea,
	Container,
	RegisterBtn,
};
