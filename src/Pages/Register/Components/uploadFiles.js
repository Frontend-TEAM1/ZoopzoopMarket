import { flexAlignCenter, flexAllCenter } from 'Styles/common';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

const UploadFiles = ({ register, images, setImages, setValue }) => {
	const [imgSrc, setImgSrc] = useState([]);
	const [uploaded, setUploaded] = useState([]);

	const onUpload = async e => {
		setImages([]);
		if (e.target.files) {
			const fileArr = e.target.files;
			const fileURLs = [];
			const arrForUpload = [];

			for (let i = 0; i < fileArr.length && i < 5; i++) {
				const file = fileArr[i];
				const fileURL = await readFileAsync(file);
				fileURLs.push(fileURL);
				arrForUpload.push(fileArr[i]);
			}

			setImgSrc(fileURLs);
			setUploaded(arrForUpload);
		} else setImgSrc(imgSrc);
	};

	const readFileAsync = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const onClickDeleteNew = idx => {
		const newFileURLs = imgSrc.filter(url => url !== imgSrc[idx]);
		const newArr = uploaded.filter(img => img.name !== uploaded[idx].name);
		setUploaded(newArr);
		setImgSrc(newFileURLs);
	};

	const onClickDeleteOld = idx => {
		const newFileURLs = images.filter(url => url !== images[idx]);
		setImages(newFileURLs);
	};

	useEffect(() => {
		setValue('mainImg', uploaded);
	}, [uploaded]);

	return (
		<S.Wrapper>
			<input
				id="mainImg"
				type="file"
				accept="image/*"
				multiple
				key={Math.random()}
				style={{ display: 'none' }}
				{...register('mainImg')}
				onChange={e => {
					register('mainImg').onChange(e);
					onUpload(e);
				}}
			/>
			<S.ImgContainer>
				<S.MainImgContainer>
					<label htmlFor="mainImg">
						<S.MainImgSection
							src={images[0] || imgSrc[0] || '/Assets/Images/registerImage.png'}
						/>
					</label>
					{(images[0] || imgSrc[0]) && (
						<S.DelBtn
							onClick={e => {
								register('mainImg').onChange(e);
								images.length !== 0 ? onClickDeleteOld(0) : onClickDeleteNew(0);
							}}
						>
							-
						</S.DelBtn>
					)}
				</S.MainImgContainer>
				<S.SmallImgBox>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[1] || imgSrc[1] || '/Assets/Images/registerImage.png'
								}
							/>
						</label>
						{(images[1] || imgSrc[1]) && (
							<S.DelBtn
								onClick={e => {
									register('mainImg').onChange(e);
									images.length !== 0
										? onClickDeleteOld(1)
										: onClickDeleteNew(1);
								}}
							>
								-
							</S.DelBtn>
						)}
					</S.SmallImgContainer>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[2] || imgSrc[2] || '/Assets/Images/registerImage.png'
								}
							/>
						</label>
						{(images[2] || imgSrc[2]) && (
							<S.DelBtn
								onClick={e => {
									register('mainImg').onChange(e);
									images.length !== 0
										? onClickDeleteOld(2)
										: onClickDeleteNew(2);
								}}
							>
								-
							</S.DelBtn>
						)}
					</S.SmallImgContainer>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[3] || imgSrc[3] || '/Assets/Images/registerImage.png'
								}
							/>
						</label>
						{(images[3] || imgSrc[3]) && (
							<S.DelBtn
								onClick={e => {
									register('mainImg').onChange(e);
									images.length !== 0
										? onClickDeleteOld(3)
										: onClickDeleteNew(3);
								}}
							>
								-
							</S.DelBtn>
						)}
					</S.SmallImgContainer>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[4] || imgSrc[4] || '/Assets/Images/registerImage.png'
								}
							/>
						</label>
						{(images[4] || imgSrc[4]) && (
							<S.DelBtn
								onClick={e => {
									register('mainImg').onChange(e);
									images.length !== 0
										? onClickDeleteOld(4)
										: onClickDeleteNew(4);
								}}
							>
								-
							</S.DelBtn>
						)}
					</S.SmallImgContainer>
				</S.SmallImgBox>
			</S.ImgContainer>
			<S.Count>{imgSrc.length || images.length} / 5</S.Count>
		</S.Wrapper>
	);
};

export default UploadFiles;

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
`;

const ImgContainer = styled.div`
	${flexAllCenter}
	flex-direction: column;
`;

const MainImgContainer = styled.div`
	width: 700px;
	height: 300px;
	position: relative;
	border: 2px solid ${({ theme }) => theme.color.primary[100]};

	@media screen and (max-width: 1100px) {
		width: 600px;
		height: 250px;
	}
	@media screen and (max-width: 768px) {
		width: 350px;
		height: 200px;
	}
`;

const MainImgSection = styled.img`
	width: 100%;
	height: 100%;
	cursor: pointer;
	object-fit: cover;
`;

const DelBtn = styled.div`
	width: 30px;
	height: 30px;
	top: 6px;
	right: 6px;
	border-radius: 15px;
	border: none;
	background-color: ${({ theme }) => theme.color.primary[400]};
	position: absolute;
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.fontSize.lg};
	${flexAllCenter}
	:hover {
		width: 32px;
		height: 32px;
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		width: 20px;
		height: 20px;
		:hover {
			width: 22px;
			height: 22px;
			cursor: pointer;
		}
	}
`;

const SmallImgBox = styled.div`
	width: 700px;
	${flexAlignCenter}
	justify-content: space-between;

	@media screen and (max-width: 1100px) {
		width: 600px;
	}
	@media screen and (max-width: 768px) {
		width: 350px;
	}
`;

const SmallImgContainer = styled.div`
	width: 173px;
	height: 120px;
	position: relative;
	margin-top: 2px;
	border: 2px solid ${({ theme }) => theme.color.primary[100]};
	@media screen and (max-width: 1100px) {
		width: 148px;
		height: 90px;
	}
	@media screen and (max-width: 768px) {
		width: 98px;
		height: 60px;
	}
`;

const SmallImgSection = styled.img`
	width: 100%;
	height: 100%;
	cursor: pointer;
	object-fit: cover;
`;

const Count = styled.span`
	margin: 20px 0;
	${flexAllCenter}
	font-weight: ${({ theme }) => theme.fontWeight.bold};
	@media (max-width: 768px) {
		font-size: ${({ theme }) => theme.fontSize.sm};
	}
`;

const S = {
	Wrapper,
	ImgContainer,
	MainImgContainer,
	MainImgSection,
	DelBtn,
	SmallImgBox,
	SmallImgContainer,
	SmallImgSection,
	Count,
};
