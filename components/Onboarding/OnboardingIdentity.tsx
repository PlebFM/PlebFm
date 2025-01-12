import Image from 'next/image';
import Avatar from '../Utils/Avatar';
import Button from '../Utils/Button';
import { SearchIcon } from '@bitcoin-design/bitcoin-icons-react/outline';
import React from 'react';

interface OnboardingIdentityProps {
  userProfile: {
    firstNym: string;
    lastNym: string;
    color: string;
  };
  setNewUserFunc: () => void;
}

export default function OnboardingIdentity(props: OnboardingIdentityProps) {
  return (
    <>
      <div className="fixed w-full h-full bg-black top-0 left-0 bg-pfm-purple-100">
        <Image
          src={'/pfm-bokeh-1.jpg'}
          alt=""
          width="1"
          height="1"
          className="object-cover w-full h-full blur-2xl opacity-75"
        />
      </div>

      <div className="px-6 py-12 text-white relative z-50 justify-between flex flex-col space-y-6 items-center min-h-screen font-thin">
        <div className="w-2/3 mx-auto flex flex-col space-y-4 text-center">
          <Avatar
            firstNym={props.userProfile.firstNym}
            lastNym={props.userProfile.lastNym}
            color={props.userProfile.color}
          />
          <p className="text-2xl">
            {props.userProfile.firstNym} {props.userProfile.lastNym}
          </p>
        </div>

        <div className="text-3xl leading-relaxed text-center">
          <p>
            Let’s jam,
            <br />{' '}
            <strong>
              {props.userProfile.firstNym} {props.userProfile.lastNym}
            </strong>
            .
          </p>
        </div>

        <Button
          size="large"
          icon={<SearchIcon />}
          onClick={props.setNewUserFunc}
        >
          Find a Song
        </Button>
      </div>
    </>
  );
}
