class ResponsiveStore {
	isMobile: boolean = $state(false);

	checkIfMobile = () => {
		if (typeof window === 'undefined') {
			this.isMobile = false;
			return;
		}
		this.isMobile = window.innerWidth <= 768;
		console.log('Checking if mobile...', this.isMobile);
	};
}

const responsiveStore = new ResponsiveStore();

export default responsiveStore;
