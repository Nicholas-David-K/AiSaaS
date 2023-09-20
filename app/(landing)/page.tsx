import { auth, currentUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import LandingContent from '@/components/landing-content';
import { LandingHero } from '@/components/landing-hero';
import LandingNavbar from '@/components/landing-navbar';
import Link from 'next/link';
import React from 'react';

type Props = {};

const LandingPage = (props: Props) => {
    return (
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            <LandingContent />
        </div>
    );
};

export default LandingPage;
