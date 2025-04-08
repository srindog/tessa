import React, { useState } from 'react';

import { Button, Label, Textarea } from '@windmill/react-ui';

import { capitalizePhrase } from '../../../../utils/grammer';

const inviteCharacterLimit = 300;

function Professional({ data, className }: any) {
  const [copied, setCopied] = useState(false);
  const [defaultInvite] = useState(data.invite);
  const [invite, setInvite] = useState(data.invite);
  const [inviteLength, setInviteLength] = useState(invite.length);

  const handleInviteChange = (e: any) => {
    const newInvite = e.target.value;
    setInvite(newInvite);
    setInviteLength(newInvite.length);
  };

  const handleInviteCopy = () => {
    setCopied(false);
    navigator.clipboard.writeText(invite);
    setCopied(true);
  };

  const handleSetInviteToDefault = () => {
    setInvite(defaultInvite);
    setInviteLength(defaultInvite.length);
  };

  return (
    <div className={className}>
      <div className="mt-6 ml-5 mr-8 max-w-md">
        <a
          href={data.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="underline text-3xl text-blue-500 font-semibold"
        >
          {data.name}
        </a>
        <p className="text-2xl mt-3 font-semibold">
          {capitalizePhrase(data.domain)}{' '}
          {data.company && data.company !== data.domain && `@ ${data.company}`}
        </p>
        <p className="text-2xl mt-3">{capitalizePhrase(data.career)} in</p>
        <p className="text-2xl mt-2">{capitalizePhrase(data.location)}</p>
      </div>
      <div className="ml-4 pt-2">
        <Label>
          <span className="text-base font-semibold">Linkedin Invite</span>
          <Textarea
            css
            className="mt-1 text-lg bg-blue-50 shadow-sm"
            rows={5}
            cols={55}
            valid={inviteLength <= inviteCharacterLimit}
            value={invite}
            onChange={handleInviteChange}
            placeholder="Custom make your linkedin invite!"
          />
          <span className="text-base ml-1">
            {inviteLength}/{inviteCharacterLimit}
          </span>
        </Label>
        <div className="">
          <Button className="text-lg mr-2" onClick={handleInviteCopy}>
            Copy Invite
          </Button>
          <Button className="text-lg" onClick={handleSetInviteToDefault}>
            Set to Default
          </Button>
        </div>
        <span className="mx-1">{copied && 'Copied!'}</span>
      </div>
    </div>
  );
}

function ProfessionalsFeed(props: any) {
  const { professionals } = props;

  return (
    <>
      <h2 className="text-4xl font-semibold text-gray-900">Professionals</h2>
      {/* <h2 className="text-xl mb-3">Networking <span className='font-semibold'>{getUniqueTopicsFromNews(news)}</span></h2> */}
      {professionals.map((professional: any, i: any) => (
        <Professional
          className="bg-blue-50 flex flex-row mb-3 p-3 rounded-lg border-2 border-solid border-blue-200 shadow-lg"
          data={professional}
          key={`professional-${i}`}
        />
      ))}
    </>
  );
}

export default ProfessionalsFeed;
