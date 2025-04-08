import React, { useState, useCallback } from 'react';

import {
  Label,
  Textarea,
  Button,
  Card,
  CardBody,
  Input,
} from '@windmill/react-ui';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

import {
  capitalizePhrase,
  getDateStringFromDateInput,
} from '../../../../utils/grammer';

const lodash = require('lodash');

const inviteCharacterLimit = 300;

const ProfessionalRecommendation = ({ data }: any) => {
  const [copied, setCopied] = useState(false);
  const [defaultInvite] = useState(data.invite);
  const [invite, setInvite] = useState(data.invite);
  const [inviteLength, setInviteLength] = useState(invite.length);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
    setCopied(false);
  };

  return (
    <div>
      <Card className={`mb-1 shadow-md bg-gray-50 mb-3 text-gray-800`}>
        <CardBody>
          <a href={data.linkedin} target="_blank" rel="noreferrer noopener">
            <div className="text-2xl flex justify-center font-semibold bg-blue-50 hover:bg-blue-100 mb-3 p-3 rounded-lg border-2 border-solid border-blue-300 shadow-lg">
              {data.name}
            </div>
          </a>
          {expanded && (
            <div className="ml-3 text-xl font-normal">
              <p>{`Recommended on ${getDateStringFromDateInput(
                data.timestamp
              )}`}</p>
              <p>Interest: {capitalizePhrase(data.domain)}</p>
              <p>Career: {capitalizePhrase(data.career)}</p>
              <p>Location: {capitalizePhrase(data.location)}</p>
              {data.company && <p>Company: {data.company}</p>}
              <p>
                <Label>
                  <span className="text-base font-semibold">
                    Linkedin Invite
                  </span>
                  <Textarea
                    css
                    className="mt-1 text-base bg-blue-50 shadow-sm"
                    rows={5}
                    cols={30}
                    valid={inviteLength <= inviteCharacterLimit}
                    value={invite}
                    onChange={handleInviteChange}
                    placeholder="Custom make your linkedin invite!"
                  />
                  <span className="text-base ml-1">
                    {inviteLength}/{inviteCharacterLimit}
                  </span>
                </Label>
              </p>
              <div>
                <Button
                  className="text-base mr-2"
                  onClick={handleInviteCopy}
                  size="small"
                >
                  Copy Invite
                </Button>
                <Button
                  className="text-base"
                  onClick={handleSetInviteToDefault}
                  size="small"
                >
                  Set to Default
                </Button>
              </div>
              {copied && (
                <span className="ml-1 text-base">{copied && 'Copied!'}</span>
              )}
            </div>
          )}
          <Button
            block
            className={`${expanded ? 'mt-2' : 'mt-0'} bg-blue-400`}
            onClick={toggleExpanded}
            icon={expanded ? FaAngleUp : FaAngleDown}
            layout="primary"
            aria-label="expand"
          />
        </CardBody>
      </Card>
    </div>
  );
};

function ProfessionalsRecommendations(props: any) {
  const { professionals } = props;

  const [searchQuery, setSearchQuery] = useState('');
  let filteredProfessionals = professionals;

  if (searchQuery) {
    filteredProfessionals = professionals.filter((profData: any) => {
      const profString = JSON.stringify(profData).toLowerCase();
      return profString.includes(searchQuery.toLowerCase());
    });
  }

  const handleChange = (evt: any) => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  };

  const debouncedHandleChange = useCallback(
    lodash.debounce(handleChange, 300),
    []
  );

  if (!professionals) return <p>No news found...</p>;

  return (
    <div className="mt-2">
      {professionals.length > 0 && (
        <form onSubmit={handleSubmit}>
          <Label>
            <span className="text-lg">
              Search Your Recommended Professionals
            </span>
            <Input
              css="true"
              className="mb-4"
              onChange={debouncedHandleChange}
            />
          </Label>
        </form>
      )}
      <div className="mt-3 grid gap-4 grid-cols-2">
        {professionals.length > 0 && filteredProfessionals.length > 0 ? (
          filteredProfessionals.map((professional: any, i: any) => {
            return (
              <ProfessionalRecommendation
                key={`professional-${i}`}
                data={professional}
              />
            );
          })
        ) : (
          <p>No professionals found</p>
        )}
      </div>
    </div>
  );
}

export default ProfessionalsRecommendations;
