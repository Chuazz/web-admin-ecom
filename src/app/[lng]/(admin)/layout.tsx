import { Header, SideBar } from '@components/layout';
import { Layout } from '@type/index';

const AdminLayout = ({ children }: Layout) => {
	return (
		<div className='flex'>
			<SideBar />

			<div className='flex-1 h-screen overflow-auto'>
				<Header />

				{children}
			</div>
		</div>
	);
};

export default AdminLayout;
