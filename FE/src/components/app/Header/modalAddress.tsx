import { useState, useEffect } from 'react';
import { Space, Radio, RadioChangeEvent, Select } from 'antd';
import axios from 'axios';
import { ILocation } from '../../../models/location.model';
type Props = {};

const ModalAddress = ({}: Props) => {
	const [value1, setValue] = useState(1);
	const [address, setAddress] = useState('Hung Yen');
	const [provinces, setProvinces] = useState<Array<ILocation>>([]);
	const [districts, setDistricts] = useState<Array<ILocation>>([]);
	const [wards, setWards] = useState<Array<ILocation>>([]);
	const [selectedProvince, setSelectedProvince] = useState<string>('');
	const [selectedDistrict, setSelectedDistrict] = useState<string>('');
	const [selectedWard, setSelectedWard] = useState<string>('');
	const [selectedLocation, setSelectedLocation] = useState<{
		province: ILocation | null;
		district: ILocation | null;
		ward: ILocation | null;
	}>({
		province: null,
		district: null,
		ward: null,
	});

	useEffect(() => {
		fetchProvinces();
	}, []);

	const fetchProvinces = async () => {
		try {
			const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
			setProvinces(response.data.data);
			// console.log(response.data.data);
		} catch (error) {
			console.error('Error fetching provinces:', error);
		}
	};

	const fetchDistricts = async (provinceId: string) => {
		try {
			const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
			setDistricts(response.data.data);
			setWards([]);
			setSelectedDistrict('');
		} catch (error) {
			console.error('Error fetching districts:', error);
		}
	};

	const fetchWards = async (districtId: string) => {
		try {
			const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
			setWards(response.data.data);
		} catch (error) {
			console.error('Error fetching wards:', error);
		}
	};

	const handleProvinceChange = (value: string) => {
		setSelectedProvince(value);
		const selectedProv = provinces.find((p) => p.id === value);
		setSelectedLocation((prev) => ({
			...prev,
			province: selectedProv || null,
			district: null,
			ward: null,
		}));
		fetchDistricts(value);
	};

	const handleDistrictChange = (value: string) => {
		setSelectedDistrict(value);
		const selectedDist = districts.find((d) => d.id === value);
		setSelectedLocation((prev) => ({
			...prev,
			district: selectedDist || null,
			ward: null,
		}));
		fetchWards(value);
	};

	const handleWardChange = (value: string) => {
		setSelectedWard(value);
		const selectedW = wards.find((w) => w.id === value);
		setSelectedLocation((prev) => ({
			...prev,
			ward: selectedW || null,
		}));
	};
	const handleAddress = () => {
		console.log(value1);
		const selectedAddress = {
			fullAddress: `${selectedLocation.ward?.name || ''}, ${selectedLocation.district?.name || ''}, ${
				selectedLocation.province?.name || ''
			}`,
		};
		setAddress(selectedAddress.fullAddress);
	};

	const onChange = (e: RadioChangeEvent) => {
		setValue(e.target.value);
	};

	return (
		<div className="p-[15px]">
			<div className="">
				<div className="p-[15px] bg-white mb-[1px]">
					<h1 className="text-[20px] font-[400] text-center text-[#000]">Địa chỉ giao hàng</h1>
				</div>
				<div className="bg-white px-[30px] py-6">
					<p className="text-[14px] text-[#0000008a] leading-[1,43] mb-[10px]">
						Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một
						cách chính xác nhất.
					</p>
					<Radio.Group onChange={onChange} value={value1}>
						<Space direction="vertical">
							<Radio defaultChecked={true} value={1}>
								{address}
							</Radio>
							<Radio value={2}>Chọn khu vực giao hàng khác</Radio>
						</Space>
					</Radio.Group>

					{value1 === 2 && (
						<div className="mt-4 space-y-4">
							<div className="flex items-center ">
								<p className="mr-5 block w-[40%]">Chọn Tỉnh/Thành phố</p>
								<Select
									className="w-full"
									onChange={handleProvinceChange}
									value={selectedProvince}
									options={provinces.map((province) => ({
										value: province.id,
										label: province.name,
									}))}
								/>
							</div>
							<div className="flex items-center">
								<p className="mr-5 block w-[40%]">Chọn Quận/Huyện</p>
								<Select
									className="w-full"
									disabled={!selectedProvince}
									value={selectedDistrict}
									onChange={handleDistrictChange}
									options={districts.map((district) => ({
										value: district.id,
										label: district.name,
									}))}
								/>
							</div>
							<div className="flex items-center">
								<p className="mr-5 block w-[40%]">Chọn Phường/Xã</p>

								<Select
									className="w-full"
									disabled={!selectedDistrict}
									value={selectedWard}
									onChange={handleWardChange}
									options={wards.map((ward) => ({
										value: ward.id,
										label: ward.name,
									}))}
								/>
							</div>
						</div>
					)}
				</div>
				<div className="pt-[15px] px-[15px] flex justify-center">
					<button
						onClick={handleAddress}
						className="w-[296px] h-10 bg-[#ff424e] text-white rounded-[4px] border-none mx-auto uppercase"
					>
						Giao đến địa chỉ này
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalAddress;
