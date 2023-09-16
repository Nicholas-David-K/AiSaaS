import Image from 'next/image';

type Props = {
    label: string;
};

export const Empty = ({ label }: Props) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image alt="empty" fill src="/images/empty.png" />
            </div>
            <p className="text-muted-foreground mt-3 text-center text-sm">{label}</p>
        </div>
    );
};



// CONTINUE LESSON 2:08:02