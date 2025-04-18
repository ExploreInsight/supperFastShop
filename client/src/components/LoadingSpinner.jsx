const LoadingSpinner = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-900'>
			<div className='relative'>
				<div className='w-10 h-10 border-blue-200 border-2 rounded-full' />
				<div className='w-10 h-10 border-blue-500 border-t-2 animate-spin  rounded-full absolute left-0 top-0 duration-300' />
				<div className='sr-only'>Loading</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;