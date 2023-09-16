import Image from 'next/image';
import React from 'react';

type Props = {};

const Loader = (props: Props) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image alt="empty" fill src="/images/loading.gif" />
            </div>
        </div>
    );
};

export default Loader;
