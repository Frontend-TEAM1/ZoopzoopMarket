import { useState } from 'react';
import styled from 'styled-components';

const UploadFiles = ({ register, images, setImages, setValue }) => {
	const [imgSrc, setImgSrc] = useState([]);
	const [selectedImgIndex, setSelectedImgIndex] = useState(null);

	const onUpload = async e => {
		setImages([]);
		const fileArr = e.target.files;
		const fileURLs = [];

		for (let i = 0; i < fileArr.length && i < 5; i++) {
			const file = fileArr[i];
			const fileURL = await readFileAsync(file);
			fileURLs.push(fileURL);
		}
		setImgSrc(fileURLs);
		console.log('fileArr', fileArr);
	};

	const readFileAsync = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const onClickDelete = idx => {
		if (imgSrc.length === 0 && images.length === 0) return;
		const newFileURLs = !images
			? imgSrc.filter(url => url !== imgSrc[idx])
			: images.filter(url => url !== images[idx]);
		setImgSrc(newFileURLs);
		setImages(newFileURLs);
		console.log(newFileURLs);
	};

	return (
		<S.Wrapper>
			<input
				id="mainImg"
				type="file"
				accept="image/*"
				multiple
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
							src={images[0] || imgSrc[0] || '/Assets/Images/defaultImage.png'}
							onClick={() => setSelectedImgIndex(0)}
						/>
					</label>
					<S.DelBtn onClick={() => onClickDelete(0)}>-</S.DelBtn>
				</S.MainImgContainer>
				<S.SmallImgBox>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[1] || imgSrc[1] || '/Assets/Images/defaultImage.png'
								}
								onClick={() => setSelectedImgIndex(1)}
							/>
						</label>
						<S.DelBtn onClick={() => onClickDelete(1)}>-</S.DelBtn>
					</S.SmallImgContainer>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[2] || imgSrc[2] || '/Assets/Images/defaultImage.png'
								}
								onClick={() => setSelectedImgIndex(2)}
							/>
						</label>
						<S.DelBtn onClick={() => onClickDelete(2)}>-</S.DelBtn>
					</S.SmallImgContainer>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[3] || imgSrc[3] || '/Assets/Images/defaultImage.png'
								}
								onClick={() => setSelectedImgIndex(3)}
							/>
						</label>
						<S.DelBtn onClick={() => onClickDelete(3)}>-</S.DelBtn>
					</S.SmallImgContainer>
					<S.SmallImgContainer>
						<label htmlFor="mainImg">
							<S.SmallImgSection
								src={
									images[4] || imgSrc[4] || '/Assets/Images/defaultImage.png'
								}
								onClick={() => setSelectedImgIndex(4)}
							/>
						</label>
						<S.DelBtn onClick={() => onClickDelete(4)}>-</S.DelBtn>
					</S.SmallImgContainer>
				</S.SmallImgBox>
			</S.ImgContainer>
			<S.Count>{imgSrc.length} / 5</S.Count>
		</S.Wrapper>
	);
};

export default UploadFiles;

const Wrapper = styled.div`
	width: 800px;
	margin: 0 auto;
`;

const ImgContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const MainImgContainer = styled.div`
	width: 360px;
	height: 360px;
	position: relative;
`;

const MainImgSection = styled.img`
	width: 360px;
	height: 360px;
	cursor: pointer;
	border: 1px solid ${({ theme }) => theme.color.subBeige};
	object-fit: cover;
`;

const SmallImgBox = styled.div`
	width: 376px;
	height: 376px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`;

const SmallImgContainer = styled.div`
	width: 171px;
	height: 171px;
	position: relative;
	margin: 0 4px;
`;

const SmallImgSection = styled.img`
	width: 171px;
	height: 171px;
	cursor: pointer;
	object-fit: cover;
	border: 1px solid ${({ theme }) => theme.color.subBeige};
`;

const DelBtn = styled.div`
	width: 30px;
	height: 30px;
	top: 5px;
	right: 5px;
	border-radius: 15px;
	border: none;
	background-color: ${({ theme }) => theme.color.primary};
	position: absolute;
	color: ${({ theme }) => theme.color.white};
	font-size: ${({ theme }) => theme.fontSize.lg};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Count = styled.span`
	margin: 20px 0;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
const S = {
	Wrapper,
	ImgContainer,
	MainImgContainer,
	MainImgSection,
	SmallImgBox,
	SmallImgContainer,
	SmallImgSection,
	DelBtn,
	Count,
};
