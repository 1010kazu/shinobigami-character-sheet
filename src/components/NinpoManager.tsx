import React, { useState } from 'react';
import { NinpoList, NinpoCard, NinpoName, NinpoDescription, NinpoCost, Button, DangerButton, FormGroup, Label, Input, TextArea } from './styled/CharacterSheet';
import { Ninpo } from '../types/character';

interface NinpoManagerProps {
  ninpo: Ninpo[];
  onUpdate: (ninpo: Ninpo[]) => void;
}

const NinpoManager: React.FC<NinpoManagerProps> = ({ ninpo, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newNinpo, setNewNinpo] = useState<Partial<Ninpo>>({});

  const handleAdd = () => {
    if (newNinpo.name && newNinpo.description !== undefined && newNinpo.cost !== undefined) {
      onUpdate([...ninpo, newNinpo as Ninpo]);
      setNewNinpo({});
      setIsAdding(false);
    }
  };

  const handleDelete = (index: number) => {
    const updatedNinpo = ninpo.filter((_, i) => i !== index);
    onUpdate(updatedNinpo);
  };

  return (
    <div>
      <NinpoList>
        {ninpo.map((n, index) => (
          <NinpoCard key={index}>
            <NinpoName>{n.name}</NinpoName>
            <NinpoDescription>{n.description}</NinpoDescription>
            <NinpoCost>コスト: {n.cost}</NinpoCost>
            <DangerButton onClick={() => handleDelete(index)}>削除</DangerButton>
          </NinpoCard>
        ))}
      </NinpoList>

      {isAdding ? (
        <div style={{ marginTop: '20px', padding: '20px', border: '2px solid #bdc3c7', borderRadius: '8px' }}>
          <FormGroup>
            <Label>忍法名</Label>
            <Input
              value={newNinpo.name || ''}
              onChange={(e) => setNewNinpo({ ...newNinpo, name: e.target.value })}
              placeholder="忍法名を入力"
            />
          </FormGroup>
          <FormGroup>
            <Label>説明</Label>
            <TextArea
              value={newNinpo.description || ''}
              onChange={(e) => setNewNinpo({ ...newNinpo, description: e.target.value })}
              placeholder="忍法の説明を入力"
            />
          </FormGroup>
          <FormGroup>
            <Label>コスト</Label>
            <Input
              type="number"
              min="0"
              value={newNinpo.cost || ''}
              onChange={(e) => setNewNinpo({ ...newNinpo, cost: Number(e.target.value) })}
              placeholder="コストを入力"
            />
          </FormGroup>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <Button onClick={handleAdd}>追加</Button>
            <Button onClick={() => setIsAdding(false)}>キャンセル</Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsAdding(true)} style={{ marginTop: '15px' }}>
          忍法を追加
        </Button>
      )}
    </div>
  );
};

export default NinpoManager; 