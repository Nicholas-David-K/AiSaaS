'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {};

const testimonials = [
    {
        name: 'Nicholas',
        title: 'Software Engineer',
        description: 'This is the best application I have ever used.',
    },
    {
        name: 'John',
        title: 'Product Designer',
        description:
            'As a designer, I appreciate the beautiful user interface and intuitive design of this application.',
    },
    {
        name: 'Emily',
        title: 'Business Owner',
        description:
            'This application has saved me so much time and money. I highly recommend it to fellow business owners.',
    },
    {
        name: 'Josh',
        title: 'Student',
        description:
            "I've been using this app for my studies, and it has made learning much more enjoyable and efficient.",
    },
];

// You can now use the `testimonials` array in your application to display the testimonials.

const LandingContent = (props: Props) => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card
                        key={item.description}
                        className="bg-[#192339] border-none text-white "
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">
                                        {item.title}
                                    </p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0 text-sm">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LandingContent;
