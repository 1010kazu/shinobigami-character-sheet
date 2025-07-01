import React, { useState } from 'react';
import { NinpoList, NinpoCard, NinpoName, NinpoDescription, NinpoCost, Button, DangerButton, FormGroup, Label, Input, TextArea } from './styled/CharacterSheet';
import { NinjaTool } from '../types/character';

interface NinjaToolManagerProps {
  ninjaTools: NinjaTool[];
  onUpdate: (ninjaTools: NinjaTool[]) => void;
}

const NinjaToolManager: React.FC<NinjaToolManagerProps> = ({ ninjaTools, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTool, setNewTool] = useState<Partial<NinjaTool>>({});

  const handleAdd = () => {
    if (newTool.name && newTool.description !== undefined && newTool.quantity !== undefined) {
      onUpdate([...ninjaTools, newTool as NinjaTool]);
      setNewTool({});
      setIsAdding(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedTools = ninjaTools.filter((_, i) => i !== index);
    onUpdate(updatedTools);
  };

  return (
    <div>
      <NinpoList>
        {ninjaTools.map((tool, index) => (
          <NinpoCard key={index}>
            <NinpoName>{tool.name}</NinpoName>
            <NinpoDescription>{tool.description}</NinpoDescription>
            <NinpoCost>数量: {tool.quantity}</NinpoCost>
            <DangerButton onClick={() => handleDelete(index)}>削除</DangerButton>
          </NinpoCard>
        ))}
      </NinpoList>

      {isAdding ? (
        <div style={{ marginTop: '20px', padding: '20px', border: '2px solid #bdc3c7', borderRadius: '8px' }}>
          <FormGroup>
            <Label>忍具名</Label>
            <Input
              value={newTool.name || ''}
              onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
              placeholder="忍具名を入力"
            />
          </FormGroup>
          <FormGroup>
            <Label>説明</Label>
            <TextArea
              value={newTool.description || ''}
              onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
              placeholder="忍具の説明を入力"
            />
          </FormGroup>
          <FormGroup>
            <Label>数量</Label>
            <Input
              type="number"
              min="0"
              value={newTool.quantity || ''}
              onChange={(e) => setNewTool({ ...newTool, quantity: Number(e.target.value) })}
              placeholder="数量を入力"
            />
          </FormGroup>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <Button onClick={handleAdd}>追加</Button>
            <Button onClick={() => setIsAdding(false)}>キャンセル</Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsAdding(true)} style={{ marginTop: '15px' }}>
          忍具を追加
        </Button>
      )}
    </div>
  );
};

export default NinjaToolManager; 