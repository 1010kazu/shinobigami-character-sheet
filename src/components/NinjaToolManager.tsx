import React from 'react';
import { NinjaTool } from '../types/character';
import { FormGroup, Label, Input, NinjaToolCenter } from './styled/CharacterSheet';

interface NinjaToolManagerProps {
  ninjaTools: NinjaTool;
  onUpdate: (ninjaTools: NinjaTool) => void;
}

const NinjaToolManager: React.FC<NinjaToolManagerProps> = ({ ninjaTools, onUpdate }) => {
  const handleChange = (key: keyof NinjaTool, value: number) => {
    onUpdate({ ...ninjaTools, [key]: value });
  };

  return (
    <NinjaToolCenter>
      <div style={{ display: 'flex', gap: '30px', margin: '10px 0' }}>
        <FormGroup>
          <Label>兵糧丸</Label>
          <Input
            type="number"
            min="0"
            value={ninjaTools.hyorogan}
            onChange={e => handleChange('hyorogan', Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label>神通丸</Label>
          <Input
            type="number"
            min="0"
            value={ninjaTools.jintsugan}
            onChange={e => handleChange('jintsugan', Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label>遁甲符</Label>
          <Input
            type="number"
            min="0"
            value={ninjaTools.tonkofu}
            onChange={e => handleChange('tonkofu', Number(e.target.value))}
          />
        </FormGroup>
      </div>
    </NinjaToolCenter>
  );
};

export default NinjaToolManager; 