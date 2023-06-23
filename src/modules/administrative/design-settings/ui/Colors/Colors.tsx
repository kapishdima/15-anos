import React from 'react';
import { ColorField } from '../ColorField/ColorField';
import { ScrollXArea } from '@/components';

export const Colors: React.FC = () => {
  return (
    <div className="colors">
      <label className="colors-label">Theme colors</label>
      <ScrollXArea>
        <ColorField name={`countdown`} label="Countdown" />
        <ColorField name={`countdown`} label="Countdown" />
        <ColorField name={`countdown`} label="Countdown" />
        <ColorField name={`upper_bar`} label="Upper bar" />
        <ColorField name={`upper_bar`} label="Upper bar" />
        <ColorField name={`lower_bar`} label="Lower bar" />
        <ColorField name={`lower_bar`} label="Lower bar" />
        <ColorField name={`lower_bar`} label="Lower bar" />
        <ColorField name={`invitation`} label="Invitation" />
        <ColorField name={`invitation`} label="Invitation" />
        <ColorField name={`invitation`} label="Invitation" />
        <ColorField name={`invitation_text`} label="Invitation text" />
      </ScrollXArea>
    </div>
  );
};
