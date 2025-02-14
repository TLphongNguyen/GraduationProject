type Props = {};

// import Translate from '../components/base/translate/Translate';
// import { setAuthentication } from '../reducers/slice/authSlice';
import { useAppDispatch } from '../redux/store';
import HeaderCpn from '../components/app/Header/HeaderCpn';

const Home = ({}: Props) => {
	const dispatch = useAppDispatch();

	return (
		<div className="">
			<HeaderCpn />
		</div>
	);
};

export default Home;
