import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import ClientsTable from './components/ClientsTable';
import CardBox from 'src/components/shared/CardBox';

const ClientsList = () => {
    const BCrumb = [
        {
            to: '/',
            title: 'Home',
        },
        {
            title: 'Clients',
        },
    ];

    return (
        <>
            {/* Breadcrumb */}
            <BreadcrumbComp title="Clients" items={BCrumb} />

            {/* Single bordered card — header + table together */}
            <CardBox>
                {/* Header inside border */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h4 className="text-xl font-semibold text-foreground">Clients List</h4>
                        <p className="text-sm text-muted-foreground mt-1">Manage and view all your clients</p>
                    </div>
                    <Link to="/clients/create">
                        <button className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors duration-150 cursor-pointer">
                            <Icon icon="solar:add-circle-linear" width={18} height={18} />
                            Create Client
                        </button>
                    </Link>
                </div>

                {/* Table — no extra border */}
                <ClientsTable />
            </CardBox>
        </>
    );
};

export default ClientsList;