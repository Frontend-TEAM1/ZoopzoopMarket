import styled from 'styled-components';

const MProfile = () => {
	return (
		<>
			<S.Circle>
				<S.Img src="Assets/Images/1.jpg"></S.Img>
			</S.Circle>
		</>
	);
};

export default MProfile;

const Circle = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 30px;
	overflow: hidden;
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
`;

const S = {
	Circle,
	Img,
};
