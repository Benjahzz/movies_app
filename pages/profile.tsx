import SidebarProfile from '@/components/SidebarProfile';
import LayoutAuth from '@/components/layouts/LayoutAuth';
import ProfileInformation from '@/components/profile/ProfileInformation';
import { Element } from '@/types/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ReactElement, useEffect } from 'react';

const tabs: { [key: string]: React.ReactNode | null } = {
    "information": <ProfileInformation />,
    "billings": null
}


const Profile = () => {
    const router = useRouter()
    const { tab } = router.query

    useEffect(() => {
        if (!tabs[tab as string]) {
            router.push("?tab=information")
        }
    }, [tab, router])
    return (
        <main className="pt-40 px-16 w-full">
            <div className='w-4/6 mx-auto flex gap-44'>
                <SidebarProfile />
                <div className='mt-20'>
                    {
                        tabs[tab as string]
                    }
                </div>
            </div>
        </main>
    )
}
Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutAuth>
            {page}
        </LayoutAuth>
    );
};

export default Profile