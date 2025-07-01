import React, { useState } from 'react';
import { Modal, ModalContent, ModalTitle, ModalButtons, Button, Input, Label, FormGroup } from './styled/CharacterSheet';

interface StatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (value: number) => void;
  statName: string;
  currentValue: number;
}

const StatModal: React.FC<StatModalProps> = ({ isOpen, onClose, onSave, statName, currentValue }) => {
  const [value, setValue] = useState(currentValue);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const handleCancel = () => {
    setValue(currentValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <ModalTitle>{statName}の設定</ModalTitle>
        <FormGroup>
          <Label>能力値（0-10）</Label>
          <Input
            type="number"
            min="0"
            max="10"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            autoFocus
          />
        </FormGroup>
        <ModalButtons>
          <Button onClick={handleSave}>保存</Button>
          <Button onClick={handleCancel}>キャンセル</Button>
        </ModalButtons>
      </ModalContent>
    </Modal>
  );
};

export default StatModal; 