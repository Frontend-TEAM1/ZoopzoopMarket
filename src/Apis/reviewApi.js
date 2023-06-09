import { Axios } from './@core';

const PATH = '/api/review';

const ReviewApi = {
	reviewList() {
		return Axios.get(PATH, {
			params: {
				page: 1,
			},
		});
	},

	reviewDetail(idx) {
		return Axios.get(PATH + '/get', {
			params: {
				review_idx: idx,
			},
		});
	},

	postReview(data, idx) {
		return Axios.post(PATH, data, {
			params: { payList_idx: idx },
		});
	},

	editReview(data, idx) {
		return Axios.patch(PATH, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
			params: { review_idx: idx },
		});
	},

	deleteReview(idx) {
		return Axios.delete(PATH, {
			params: { review_idx: idx },
		});
	},
};
export default ReviewApi;
