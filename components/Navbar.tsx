import MobileSidebar from '@/components/mobile-sidebar';
import { UserButton } from '@clerk/nextjs';
import { checkSubscription } from '@/lib/subscription';
import { getApiLimitCount } from '@/lib/api-limit';

type Props = {};

const Navbar = async (props: Props) => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className="flex items-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    );
};

export default Navbar;
