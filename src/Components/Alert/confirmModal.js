import { motion } from 'framer-motion';
import styled from 'styled-components';

import { flexAllCenter } from 'Styles/common';

const ConfirmModal = ({ children }) => {
	return (
		<S.Wrap>
			<S.Container
				as={motion.div}
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.3,
					delay: 0.2,
					ease: [0, 0.1, 0.2, 1.0],
				}}
			>
				{children}
			</S.Container>
		</S.Wrap>
	);
};

export default ConfirmModal;

const Wrap = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.7);
	${flexAllCenter}
`;

const Container = styled(motion.div)`
	width: 350px;
	height: 180px;
	background-color: ${({ theme }) => theme.color.white};
	border: 3px double ${({ theme }) => theme.color.primary[400]};
	border-radius: 10px;
	padding: 40px 30px;
	flex-direction: column;
	margin-bottom: 50px;
`;

const S = {
	Wrap,
	Container,
};
