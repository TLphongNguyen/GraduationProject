import { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { TiHome } from 'react-icons/ti';
import { CiFaceSmile } from 'react-icons/ci';
import { BiCartAlt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import historySearch from '../../../mocks/historySearch.json';

type Props = {};

const HeaderCpn = ({}: Props) => {
	const { t } = useTranslation();
	const [quantity, setQuantity] = useState(1);

	return (
		<header className="w-full h-[--header-height]">
			<div className="container-base bg-[#fff] h-full flex items-center gap-[48px]">
				<div className="flex flex-col min-w-[96px]">
					<img src="/img/tiki.png" alt="" className="w-full h-[40px] object-contain justify-center" />
					<span className="text-[14px] text-[#003ea1] font-[600] mt-2 ml-2">{t('Tốt & Nhanh')}</span>
				</div>
				<div className="w-full block ">
					<div className="flex w-full mb-2">
						<div className="header-search flex border border-[#ccc] rounded-[8px] h-[40px] flex-1 items-center ">
							<IoSearchOutline className="text-[#828181] text-[20px] ml-[18px]" />
							<input
								placeholder="Tìm kiếm sản phẩm"
								type="text"
								className="w-full   outline-none text-[#333] mx-2"
							/>
							<button className="bg-[#fff] h-full text-[14px] w-[92px] rounded-md max-h-9 text-center text-[#0a68ff] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd]">
								{t('Tìm kiếm')}
							</button>
						</div>
						<div className="ml-[48px] flex items-center ">
							<div className="flex items-center px-2 p-4 hover:bg-[#0060ff1f] h-10 rounded-[10px] cursor-pointer">
								<TiHome className="text-[20px] text-[--primary-color] mr-1" />
								<span className="text-[--primary-color]">{t('Trang chủ')}</span>
							</div>
							<div className="flex items-center px-2 p-4 hover:bg-[#27272a1f] h-10 rounded-[10px] cursor-pointer">
								<CiFaceSmile className="text-[20px] mr-1" />
								<span className="">{t('Tài khoản')}</span>
							</div>
							<div className="flex items-center px-2 p-4 hover:bg-[#0060ff1f] h-10 rounded-[10px] cursor-pointer relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd]">
								<BiCartAlt className="text-[20px] text-[--primary-color]" />
								<span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] rounded-full bg-[#ff424f] text-white text-[12px] flex items-center justify-center">
									{quantity}
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<ul className="history flex gap-[12px] w-[820px] overflow-hidden h-6 ">
							{historySearch?.map((item: { name: string }, index: number) => (
								<li
									className="text-[14px] text-[#808089] leading-[150%] font-[500] cursor-pointer "
									key={index}
								>
									{item.name}
								</li>
							))}
						</ul>
						<div className="address">
							
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
export default HeaderCpn;
