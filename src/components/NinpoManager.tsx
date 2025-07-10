import React, { useState } from 'react';
import { Ninpo, NinpoType } from '../types/character';
import { NinpoList, NinpoCard, NinpoName, NinpoCost, Button, DangerButton, FormGroup, Label, Input, TextArea, FormGrid } from './styled/CharacterSheet';

const NINPO_TYPES: NinpoType[] = ['攻撃', 'サポート', '装備'];

interface NinpoManagerProps {
  ninpo: Ninpo[];
  onUpdate: (ninpo: Ninpo[]) => void;
}

const NinpoManager: React.FC<NinpoManagerProps> = ({ ninpo, onUpdate }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newNinpo, setNewNinpo] = useState<Partial<Ninpo>>({});

  const handleAdd = () => {
    if (
      newNinpo.name &&
      newNinpo.type &&
      newNinpo.skill &&
      newNinpo.range !== undefined &&
      newNinpo.cost !== undefined &&
      newNinpo.effect
    ) {
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
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px' }}>{n.name}</div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px', fontSize: '0.95rem', marginBottom: '6px' }}>
              <span>タイプ: {n.type}</span>
              <span>指定特技: {n.skill}</span>
              <span>間合い: {n.range}</span>
              <span>コスト: {n.cost}</span>
            </div>
            <div style={{ textAlign: 'left', fontSize: '0.95rem', minHeight: '2.5em', marginBottom: '8px' }}>効果: {n.effect}</div>
            <DangerButton onClick={() => handleDelete(index)}>削除</DangerButton>
          </NinpoCard>
        ))}
      </NinpoList>

      {isAdding ? (
        <div style={{ marginTop: '20px', padding: '20px', border: '2px solid #bdc3c7', borderRadius: '8px' }}>
          <FormGrid>
            <FormGroup>
              <Label>忍法名</Label>
              <Input
                value={newNinpo.name || ''}
                onChange={(e) => setNewNinpo({ ...newNinpo, name: e.target.value })}
                placeholder="忍法名を入力"
              />
            </FormGroup>
            <FormGroup>
              <Label>タイプ</Label>
              <select
                value={newNinpo.type || ''}
                onChange={(e) => setNewNinpo({ ...newNinpo, type: e.target.value as NinpoType })}
                style={{ padding: '10px', borderRadius: '5px', border: '2px solid #bdc3c7', fontSize: '1rem' }}
              >
                <option value="">選択してください</option>
                {NINPO_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <Label>指定特技</Label>
              <Input
                value={newNinpo.skill || ''}
                onChange={(e) => setNewNinpo({ ...newNinpo, skill: e.target.value })}
                placeholder="指定特技を入力"
              />
            </FormGroup>
            <FormGroup>
              <Label>間合い</Label>
              <Input
                type="number"
                min="0"
                value={newNinpo.range ?? 0}
                onChange={(e) => setNewNinpo({ ...newNinpo, range: Math.max(0, Number(e.target.value)) })}
                placeholder="間合いを入力"
              />
            </FormGroup>
            <FormGroup>
              <Label>コスト</Label>
              <Input
                type="number"
                min="0"
                value={newNinpo.cost ?? 0}
                onChange={(e) => setNewNinpo({ ...newNinpo, cost: Math.max(0, Number(e.target.value)) })}
                placeholder="コストを入力"
              />
            </FormGroup>
            <FormGroup style={{ gridColumn: '1 / -1' }}>
              <Label>効果</Label>
              <TextArea
                value={newNinpo.effect || ''}
                onChange={(e) => setNewNinpo({ ...newNinpo, effect: e.target.value })}
                placeholder="効果を入力"
              />
            </FormGroup>
          </FormGrid>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
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