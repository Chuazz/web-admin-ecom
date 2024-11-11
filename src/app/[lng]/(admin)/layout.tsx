import { BreadCrumb, Header, SideBar } from '@components/layout';
import { Layout } from '@type/index';

const AdminLayout = ({ children }: Layout) => {
	return (
		<div className='flex'>
			<SideBar />

			<div className='h-screen flex-1 overflow-auto bg-slate-100'>
				<Header />

				<div className='p-4'>
					<BreadCrumb />

					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
