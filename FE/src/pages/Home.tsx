type Props = {};

// import Translate from '../components/base/translate/Translate';
// import { setAuthentication } from '../reducers/slice/authSlice';
import { useAppDispatch } from '../redux/store';
import SwiperCpn from '../components/app/swiper/swiper';

const Home = ({}: Props) => {
	const dispatch = useAppDispatch();

	return (
		<div className="">
			<SwiperCpn />
		</div>
	);
};

export default Home;
